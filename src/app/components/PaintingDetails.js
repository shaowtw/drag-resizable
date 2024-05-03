"use client"
import React, { useRef, useState, useEffect, useCallback } from 'react';
import Draggable from 'react-draggable';

const PaintingDetails = () => {

  const ImageContainerRef = useRef(null);
  const divRef = useRef(null);

  const [pSize, setPSize] = useState({ width: 700, height: 450 });
  console.log(pSize)
  const [size, setSize] = useState({ width: 210, height: 140 });
  const [dragPos, setDragPos] = useState({x: 0, y: 0});


  const handleWheel = (event) => {
    event.preventDefault();
    const delta = event.deltaY < 0 ? 10 : -10;
    const style = window.getComputedStyle(divRef.current);
    const transform = style.transform;
    const matrix = transform.match(/^matrix\((.+)\)$/);
    const translateX = matrix ? parseFloat(matrix[1].split(', ')[4]) : 0;
    const translateY = matrix ? parseFloat(matrix[1].split(', ')[5]) : 0;
    
    setSize(prevSize => {
      const width = Math.min(pSize.width, Math.max(50, prevSize.width + delta));
      const height = Math.min(pSize.height, Math.max(30, prevSize.height + delta * (prevSize.height / prevSize.width)));
      const overX = (translateX + width - pSize.width);
      const overY = (translateY + height - pSize.height);
      setDragPos((_prev) => {
        return ({
          x: Math.max(0, overX > 0 ? (_prev.x - overX) : _prev.x),
          y: Math.max(0, overY > 0 ? (_prev.y - overY) : _prev.y),
        })
      })
      return ({
        width: width,
        height: height,
      })
    });
  };

  useEffect(() => {
    const ImageContainer = ImageContainerRef.current;
    if (ImageContainer) {
      setPSize({
        width: ImageContainer.offsetWidth,
        height: ImageContainer.offsetHeight,
      })
      ImageContainer.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (ImageContainer) {
        ImageContainer.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  useEffect(() => {
    divRef.current.style.transform = `translateX(${dragPos.x}px) translateY(${dragPos.y}px)`
  }, [dragPos]);

  return (
    <div className="flex flex-col items-center justify-center h-full relative">
      <div
        ref={ImageContainerRef}
        className="relative w-full h-[360px] md:w-[700px] md:h-[450px] min-w-80 min-h-48 aspect-w-4 aspect-h-3 border-2 border-gray-400 mt-4 mx-auto"
      >
        <Draggable bounds="parent" scale={1}  enableUserSelectHack onDrag={(e, data) => setDragPos({x: data.x, y: data.y})}>
            <div ref={divRef} style={{
              width: size.width,
              height: size.height,
              overflow: 'hidden',
              backgroundImage: "url('https://t4.ftcdn.net/jpg/02/16/15/33/360_F_216153311_bZyiKtBdWnwyUKOOqRcJIjo6ZGP0KFSm.jpg')",
              backgroundSize: 'cover',
              transform: `translateX(${dragPos.x}px) translateY(${dragPos.y}px)` }}
            >
            </div>
        </Draggable>
      </div>
      <div className="flex flex-col gap-8 items-center mt-8 md:w-[50%] w-[90%]">
        <h2 className="font-bold text-2xl sm:text-4xl">Image Title</h2>
        <div className="overflow-y-auto h-64 md:max-h-52 mt-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <p className="mt-2 px-20">
              I am thrilled to have you explore our collection of exquisite art pieces. Each painting has a story to tell and we are here to guide you through the journey of discovery. Enjoy the blend of history and creativity that each canvas brings.
              If you have any questions or need assistance, our staff is always on hand to provide you with the insights you need. Thank you for choosing to spend your time with us, and we hope you find inspiration and joy in our gallery.
              I am thrilled to have you explore our collection of exquisite art pieces. Each painting has a story to tell and we are here to guide you through the journey of discovery. Enjoy the blend of history and creativity that each canvas brings.
              If you have any questions or need assistance, our staff is always on hand to provide you with the insights you need. Thank you for choosing to spend your time with us, and we hope you find inspiration and joy in our gallery.
              I am thrilled to have you explore our collection of exquisite art pieces. Each painting has a story to tell and we are here to guide you through the journey of discovery. Enjoy the blend of history and creativity that each canvas brings.
              If you have any questions or need assistance, our staff is always on hand to provide you with the insights you need. Thank you for choosing to spend your time with us, and we hope you find inspiration and joy in our gallery.
              Warm regards,<br />
              The Gallery Team
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaintingDetails;