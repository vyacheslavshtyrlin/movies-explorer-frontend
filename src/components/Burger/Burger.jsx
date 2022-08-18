import './Burger.css';
import { useMediaQuery } from 'react-responsive';
import { useEffect } from 'react';


export default function Burger({isOpen, onClickMenu}) {

  const isMobile = useMediaQuery({ query: `(max-width: 800px)` });

  const handleOnClickBurger = () => {
    onClickMenu(isOpen);
  }

  useEffect(() => {
    if (!isMobile) {
      onClickMenu(true);
    }
  }, [isMobile, onClickMenu]);


  return (
    <button type="button" className={`burger-button burger-button_${isOpen ? 'on': 'off'}`} onClick={handleOnClickBurger}>
      <span></span>
    </button>
  )
}
