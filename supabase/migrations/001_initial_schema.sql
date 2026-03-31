-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- Hospitals Table
-- ============================================
CREATE TABLE hospitals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    level VARCHAR(50) NOT NULL CHECK (level IN ('三级甲等', '三级乙等', '二级甲等', '二级乙等')),
    departments JSONB NOT NULL DEFAULT '[]',
    rating DECIMAL(2,1) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
    review_count INTEGER DEFAULT 0 CHECK (review_count >= 0),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for common queries
CREATE INDEX idx_hospitals_city ON hospitals(city);
CREATE INDEX idx_hospitals_status ON hospitals(status);
CREATE INDEX idx_hospitals_rating ON hospitals(rating DESC);

-- ============================================
-- Reviews Table
-- ============================================
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hospital_id UUID NOT NULL REFERENCES hospitals(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    content TEXT NOT NULL CHECK (LENGTH(content) >= 10),
    nickname VARCHAR(50) NOT NULL,
    ip_address INET,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for reviews
CREATE INDEX idx_reviews_hospital_id ON reviews(hospital_id);
CREATE INDEX idx_reviews_created_at ON reviews(created_at DESC);

-- ============================================
-- Knowledge Articles Table
-- ============================================
CREATE TABLE knowledge_articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    category VARCHAR(100) NOT NULL CHECK (category IN ('types', 'prevention', 'treatment', 'symptoms', 'diagnosis')),
    content TEXT NOT NULL,
    views INTEGER DEFAULT 0 CHECK (views >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for knowledge articles
CREATE INDEX idx_knowledge_articles_slug ON knowledge_articles(slug);
CREATE INDEX idx_knowledge_articles_category ON knowledge_articles(category);

-- ============================================
-- Trigger Function: Update Hospital Rating
-- ============================================
CREATE OR REPLACE FUNCTION update_hospital_rating()
RETURNS TRIGGER AS $$
BEGIN
    -- Update the hospital's rating and review count
    UPDATE hospitals
    SET 
        rating = COALESCE((
            SELECT ROUND(AVG(rating)::numeric, 1)
            FROM reviews
            WHERE hospital_id = COALESCE(NEW.hospital_id, OLD.hospital_id)
        ), 0),
        review_count = (
            SELECT COUNT(*)
            FROM reviews
            WHERE hospital_id = COALESCE(NEW.hospital_id, OLD.hospital_id)
        )
    WHERE id = COALESCE(NEW.hospital_id, OLD.hospital_id);
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create triggers for review changes
CREATE TRIGGER trigger_update_hospital_rating_on_insert
    AFTER INSERT ON reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_hospital_rating();

CREATE TRIGGER trigger_update_hospital_rating_on_update
    AFTER UPDATE ON reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_hospital_rating();

CREATE TRIGGER trigger_update_hospital_rating_on_delete
    AFTER DELETE ON reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_hospital_rating();

-- ============================================
-- Row Level Security (RLS) Policies
-- ============================================

-- Enable RLS on all tables
ALTER TABLE hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_articles ENABLE ROW LEVEL SECURITY;

-- Hospitals: Everyone can read, only authenticated users can modify
CREATE POLICY "Hospitals are viewable by everyone" 
    ON hospitals FOR SELECT 
    USING (true);

CREATE POLICY "Hospitals can be inserted by authenticated users" 
    ON hospitals FOR INSERT 
    TO authenticated 
    WITH CHECK (true);

CREATE POLICY "Hospitals can be updated by authenticated users" 
    ON hospitals FOR UPDATE 
    TO authenticated 
    USING (true);

CREATE POLICY "Hospitals can be deleted by authenticated users" 
    ON hospitals FOR DELETE 
    TO authenticated 
    USING (true);

-- Reviews: Everyone can read and create, only owners can modify/delete
CREATE POLICY "Reviews are viewable by everyone" 
    ON reviews FOR SELECT 
    USING (true);

CREATE POLICY "Reviews can be created by everyone" 
    ON reviews FOR INSERT 
    TO anon, authenticated 
    WITH CHECK (true);

CREATE POLICY "Reviews can be updated by authenticated users" 
    ON reviews FOR UPDATE 
    TO authenticated 
    USING (true);

CREATE POLICY "Reviews can be deleted by authenticated users" 
    ON reviews FOR DELETE 
    TO authenticated 
    USING (true);

-- Knowledge Articles: Everyone can read, only authenticated users can modify
CREATE POLICY "Knowledge articles are viewable by everyone" 
    ON knowledge_articles FOR SELECT 
    USING (true);

CREATE POLICY "Knowledge articles can be inserted by authenticated users" 
    ON knowledge_articles FOR INSERT 
    TO authenticated 
    WITH CHECK (true);

CREATE POLICY "Knowledge articles can be updated by authenticated users" 
    ON knowledge_articles FOR UPDATE 
    TO authenticated 
    USING (true);

CREATE POLICY "Knowledge articles can be deleted by authenticated users" 
    ON knowledge_articles FOR DELETE 
    TO authenticated 
    USING (true);
