import React, { useEffect, useContext, useCallback, useState } from 'react';
import { AppContext } from '../App';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const BlogContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  z-index: 100;
  overflow-y: auto;
`;

const BackButton = styled.button`
  position: fixed;
  top: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  z-index: 101;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 6rem 2rem 4rem;
`;

const BlogHeader = styled.header`
  margin-bottom: 4rem;
  text-align: center;
`;

const BlogTitle = styled(motion.h1)`
  font-family: 'Moderat';
  font-size: 2.5rem;
  font-weight: 400;
  color: white;
  margin: 0 0 1rem 0;
  letter-spacing: 2px;
`;

const BlogSubtitle = styled(motion.p)`
  font-family: 'Moderat';
  font-size: 1rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.5);
  max-width: 400px;
  margin: 0 auto;
  line-height: 1.6;
  font-style: italic;
`;

const PostsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const BlogPost = styled(motion.article)`
  padding: 2rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    padding-left: 1rem;
    
    h2 {
      color: white;
    }
  }

  &:last-child {
    border-bottom: none;
  }
`;

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
`;

const PostDate = styled.time`
  font-family: 'Moderat';
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.35);
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const PostCategory = styled.span`
  font-family: 'Moderat';
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.25);
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 0.25rem 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
`;

const PostTitle = styled.h2`
  font-family: 'Moderat';
  font-size: 1.25rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 0.5rem 0;
  transition: color 0.3s ease;
`;

const PostExcerpt = styled.p`
  font-family: 'Moderat';
  font-size: 0.9rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.7;
  margin: 0;
`;

const ReadMore = styled.span`
  display: inline-block;
  font-family: 'Moderat';
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.3);
  margin-top: 1rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: color 0.3s ease;

  ${BlogPost}:hover & {
    color: rgba(255, 255, 255, 0.6);
  }
`;

// Post Detail View Styles
const PostDetailOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.98);
  z-index: 102;
  overflow-y: auto;
`;

const PostDetailBackButton = styled.button`
  position: fixed;
  top: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  z-index: 103;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const PostDetailContent = styled.div`
  max-width: 680px;
  margin: 0 auto;
  padding: 6rem 2rem 4rem;
`;

const PostDetailHeader = styled.header`
  margin-bottom: 3rem;
`;

const PostDetailMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const PostDetailTitle = styled.h1`
  font-family: 'Moderat';
  font-size: 2rem;
  font-weight: 400;
  color: white;
  margin: 0 0 1rem 0;
  letter-spacing: 1px;
`;

const PostBody = styled.div`
  font-family: 'Moderat';
  font-size: 1rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.9;
  
  p {
    margin-bottom: 1.5rem;
  }
  
  em {
    font-style: italic;
    color: rgba(255, 255, 255, 0.6);
  }
`;

const PoemContainer = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const PoemTitle = styled.h2`
  font-family: 'Moderat';
  font-size: 1.1rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 1.5rem 0;
  letter-spacing: 1px;
`;

const Poem = styled.pre`
  font-family: 'Moderat';
  font-size: 0.9rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.8;
  white-space: pre-wrap;
  word-wrap: break-word;
  margin: 0;
`;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

const contentVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.2,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Blog posts data
const blogPosts = [
  {
    id: 1,
    title: 'debut',
    date: '2026-02-16',
    excerpt: "well I thought the website needs a blog section and even though I don't yet know what to do with it, but I think you might enjoy the poem below by rob halpern's book *Common Place:*",
    category: 'Note',
    content: `well I thought the website needs a blog section and even though I don't yet know what to do with it, but I think you might enjoy the poem below by rob halpern's book *Common Place:*`,
    poem: `FALSE COMMUNIQUÉ

And so I sing this body on a table
For since the war I've read reports i
- magined events studied pro
- cedures assisting incarceration
W/ coroners who must know
Something and whose language
Rushes like unfettered streams on
- ly half-knowing the work I mean
Check out this wonder of a guy
A spectacle withdrawn & covered
With my latinate phrases issue
Displace so gorgeous a figure again
- st a ground of organs & viscera
For which the world moves its
Product making nothing this body

Linking it to that body my body
Severed from animal & plant over
Which production cycles steadily
Roll whose head the all-baffling
Brain eviscerates evacuates exa
- mines limbs jaundiced brown a
Cunning tendon nerve now strip
- ped so you still can't see things
But just imagine his dreamy eyes
Deadened plucked volition flakes
Inside pleural cavities mere sacs
Upon a table grey-white smooth
Mucosa distended stomach not
Flabby good-sized arms legs
Ureters & genitalia unremarkable
Interior what dura mater drapes
And mysteries haunt the clear
Yellow urine the pericardial bag

From which his prick might other
- wise rise normally with blood no
Longer running red runs to brown
Purple to tan as swelling jets pass
- ions patient swollen one would
Think not there since invisible
Condemned inside his fat the start
Of revolutions durable matter
Is thin delicate yielding countless
Embodiments baffling republics
Whose cranial nerves contest
My enjoyments will arrive
From the offspring of his offspring
Thru our bleakest time I come

— from him myself.`
  }
];

// Close icon component
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const Blog = () => {
  const { tvirusRef } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState(null);

  const handleBack = useCallback(() => {
    if (selectedPost) {
      setSelectedPost(null);
    } else {
      navigate(-1);
    }
  }, [navigate, selectedPost]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleBack]);

  // T-Virus zoom effect
  useEffect(() => {
    const isBlogPage = location.pathname === '/blog';

    if (isBlogPage && tvirusRef?.current) {
      const zoomTimer = setTimeout(() => {
        if (tvirusRef.current) {
          try {
            tvirusRef.current.zoomToSection('blog');
          } catch (e) {
            console.error("Blog.js: Error zooming to section:", e);
          }
        }
      }, 100);
      return () => clearTimeout(zoomTimer);
    }
  }, [location.pathname, tvirusRef]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const openPost = (post) => {
    setSelectedPost(post);
  };

  return (
    <BlogContainer>
      <BackButton onClick={handleBack} aria-label="Close">
        <CloseIcon />
      </BackButton>
      
      <ContentWrapper>
        <BlogHeader>
          <BlogTitle
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Blog
          </BlogTitle>
          <BlogSubtitle
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            textual falsehood
          </BlogSubtitle>
        </BlogHeader>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <PostsList>
            {blogPosts.map(post => (
              <BlogPost 
                key={post.id} 
                variants={itemVariants}
                onClick={() => openPost(post)}
              >
                <PostMeta>
                  <PostDate>{formatDate(post.date)}</PostDate>
                  <PostCategory>{post.category}</PostCategory>
                </PostMeta>
                <PostTitle>{post.title}</PostTitle>
                <PostExcerpt>{post.excerpt}</PostExcerpt>
                <ReadMore>Read more</ReadMore>
              </BlogPost>
            ))}
          </PostsList>
        </motion.div>
      </ContentWrapper>

      {/* Post Detail View */}
      <AnimatePresence>
        {selectedPost && (
          <PostDetailOverlay
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <PostDetailBackButton onClick={handleBack} aria-label="Back">
              <CloseIcon />
            </PostDetailBackButton>
            <PostDetailContent variants={contentVariants} initial="hidden" animate="visible">
              <PostDetailHeader>
                <PostDetailMeta>
                  <PostDate>{formatDate(selectedPost.date)}</PostDate>
                  <PostCategory>{selectedPost.category}</PostCategory>
                </PostDetailMeta>
                <PostDetailTitle>{selectedPost.title}</PostDetailTitle>
              </PostDetailHeader>
              
              <PostBody>
                <p>{selectedPost.content}</p>
              </PostBody>

              {selectedPost.poem && (
                <PoemContainer>
                  <PoemTitle>from *Common Place* by Rob Halpern</PoemTitle>
                  <Poem>{selectedPost.poem}</Poem>
                </PoemContainer>
              )}
            </PostDetailContent>
          </PostDetailOverlay>
        )}
      </AnimatePresence>
    </BlogContainer>
  );
};

export default Blog;
