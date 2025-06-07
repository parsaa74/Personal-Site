import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import OrganicImageReveal from './OrganicImageReveal';

// Staggered reveal animation for gallery items
const staggeredGrow = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.7) translateY(30px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0px);
  }
`;

// Gallery container with organic flow
const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-top: 1.5rem;
  }
  
  @media (max-width: 480px) {
    gap: 1rem;
    margin-top: 1rem;
  }
`;

// Individual gallery item with branch-inspired animations
const GalleryItem = styled.div`
  position: relative;
  opacity: 0;
  transform: scale(0.7) translateY(30px);
  
  ${props => props.isVisible && css`
    animation: ${staggeredGrow} 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    animation-delay: ${props => props.delay}ms;
  `}
  
  &:hover {
    .gallery-info {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Image info overlay with organic styling
const ImageInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(
    to top,
    ${props => props.isLight ? 'rgba(255,255,255,0.95)' : 'rgba(0,0,0,0.95)'} 0%,
    ${props => props.isLight ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'} 70%,
    transparent 100%
  );
  padding: 1.5rem 1rem 1rem;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  font-family: 'Moderat';
  color: ${props => props.isLight ? '#000' : '#fff'};
  border-radius: 0 0 12px 12px;
  backdrop-filter: blur(10px);
  
  @media (max-width: 768px) {
    padding: 1.2rem 0.8rem 0.8rem;
    opacity: 1;
    transform: translateY(0);
  }
  
  @media (max-width: 480px) {
    padding: 1rem 0.6rem 0.6rem;
  }
`;

// Title with particle-like text shadow
const ImageTitle = styled.h4`
  font-size: 1.1rem;
  margin: 0 0 0.5rem 0;
  font-weight: 500;
  text-shadow: ${props => props.isLight ? 'none' : '0 0 10px rgba(255,255,255,0.1)'};
`;

// Description with organic line height
const ImageDescription = styled.p`
  font-size: 0.9rem;
  margin: 0;
  opacity: 0.8;
  line-height: 1.4;
`;

// Lightbox overlay with branch-like reveal
const LightboxOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  animation: ${keyframes`
    from { 
      opacity: 0; 
      backdrop-filter: blur(0px);
    }
    to { 
      opacity: 1; 
      backdrop-filter: blur(5px);
    }
  `} 0.3s ease-out forwards;
  cursor: pointer;
`;

// Lightbox image with organic scaling
const LightboxImage = styled.img`
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
  animation: ${keyframes`
    from { 
      transform: scale(0.8);
      opacity: 0;
    }
    to { 
      transform: scale(1);
      opacity: 1;
    }
  `} 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  
  @media (max-width: 768px) {
    max-width: 95vw;
    max-height: 85vh;
    border-radius: 6px;
  }
  
  @media (max-width: 480px) {
    max-width: 98vw;
    max-height: 80vh;
    border-radius: 4px;
  }
`;

// Navigation dots with particle styling
const NavigationDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
`;

const NavigationDot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${props => props.isActive 
    ? (props.isLight ? '#000' : '#fff') 
    : (props.isLight ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)')
  };
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: scale(1.2);
    box-shadow: 0 0 10px ${props => props.isLight ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)'};
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${props => props.isActive ? '20px' : '12px'};
    height: ${props => props.isActive ? '20px' : '12px'};
    border-radius: 50%;
    background: ${props => props.isActive 
      ? (props.isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)') 
      : 'transparent'
    };
    transition: all 0.3s ease;
  }
`;

const OrganicImageGallery = ({ 
  images = [], 
  isLight = false,
  showInfo = true,
  enableLightbox = true,
  columns = 'auto-fit',
  minWidth = '300px'
}) => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [lightboxImage, setLightboxImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const observerRef = useRef(null);
  const galleryRef = useRef(null);

  // Intersection observer for organic reveal timing
  useEffect(() => {
    if (!galleryRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleItems(prev => new Set([...prev, index]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px'
      }
    );

    const items = galleryRef.current.querySelectorAll('[data-index]');
    items.forEach(item => observer.observe(item));

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [images]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!lightboxImage) return;
      
      if (e.key === 'Escape') {
        setLightboxImage(null);
      } else if (e.key === 'ArrowLeft') {
        const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1;
        setCurrentImageIndex(newIndex);
        setLightboxImage(images[newIndex]);
      } else if (e.key === 'ArrowRight') {
        const newIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0;
        setCurrentImageIndex(newIndex);
        setLightboxImage(images[newIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [lightboxImage, currentImageIndex, images]);

  const openLightbox = (image, index) => {
    if (enableLightbox) {
      setLightboxImage(image);
      setCurrentImageIndex(index);
    }
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <>
      <GalleryContainer 
        ref={galleryRef}
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(${minWidth}, 1fr))`
        }}
      >
        {images.map((image, index) => (
          <GalleryItem
            key={index}
            data-index={index}
            isVisible={visibleItems.has(index)}
            delay={index * 150} // Staggered delay for organic growth effect
          >
            <OrganicImageReveal
              src={image.src}
              alt={image.alt || `Gallery image ${index + 1}`}
              height={image.height || '300px'}
              isLight={isLight}
              delay={100} // Internal image reveal delay
              onClick={() => openLightbox(image, index)}
              style={{ cursor: enableLightbox ? 'pointer' : 'default' }}
            />
            
            {showInfo && (image.title || image.description) && (
              <ImageInfo 
                className="gallery-info"
                isLight={isLight}
              >
                {image.title && (
                  <ImageTitle isLight={isLight}>{image.title}</ImageTitle>
                )}
                {image.description && (
                  <ImageDescription>{image.description}</ImageDescription>
                )}
              </ImageInfo>
            )}
          </GalleryItem>
        ))}
      </GalleryContainer>

      {images.length > 1 && (
        <NavigationDots>
          {images.map((_, index) => (
            <NavigationDot
              key={index}
              isActive={index === currentImageIndex}
              isLight={isLight}
              onClick={() => {
                setCurrentImageIndex(index);
                if (lightboxImage) {
                  setLightboxImage(images[index]);
                }
              }}
            />
          ))}
        </NavigationDots>
      )}

      {/* Lightbox */}
      {lightboxImage && (
        <LightboxOverlay onClick={closeLightbox}>
          <LightboxImage 
            src={lightboxImage.src} 
            alt={lightboxImage.alt || 'Enlarged image'}
            onClick={(e) => e.stopPropagation()}
          />
        </LightboxOverlay>
      )}
    </>
  );
};

export default OrganicImageGallery; 