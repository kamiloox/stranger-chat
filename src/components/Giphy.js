import { useContext, useRef, useEffect, useState } from 'react';
import { Grid } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';
import PropTypes from 'prop-types';
import styles from '../styles/Giphy.module.scss';
import { ReactComponent as CloseIcon } from '../assets/closeIcon.svg';
import { emitMessage } from '../api/events';
import TextInput from './TextInput';
import Button from './Button';
import { GiphyContext, GiphyProvider } from '../context/GiphyContext';
import { emitterType } from '../helpers/emitterTemplate';

const giphyFetch = new GiphyFetch(process.env.REACT_APP_GIPHY_KEY);

const contentTypes = {
  gif: 'gif',
  animatedText: 'animatedText',
};

const Components = ({ setIsVisible, padding, type }) => {
  const twoSidedPadding = padding * 2;
  const [width, setWidth] = useState(window.innerWidth - twoSidedPadding);
  const inputRef = useRef(null);
  const { searchKey, setSearchKey } = useContext(GiphyContext);
  const initialAnimatedText = 'hej';

  const contentType = contentTypes[type];

  useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth - twoSidedPadding);
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [twoSidedPadding]);

  const fetchItems = (offset) => {
    return new Promise(async (resolve, reject) => {
      const pagination = {
        limit: 10,
        offset,
      };
      try {
        let data = null;
        switch (contentType) {
          case contentTypes.gif:
            if (searchKey.length === 0) data = await giphyFetch.trending(pagination);
            else data = await giphyFetch.search(searchKey, { lang: 'pl', ...pagination });
            break;
          case contentTypes.animatedText:
            if (searchKey.length === 0)
              data = await giphyFetch.animate(initialAnimatedText, pagination);
            else data = await giphyFetch.animate(searchKey, pagination);
            break;
          default:
            break;
        }
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  const handleGifClick = ({ images }) => {
    emitMessage(images.fixed_width, emitterType.gif);
    setIsVisible({ type, visible: true });
  };

  return (
    <>
      <Grid
        key={searchKey}
        columns={2}
        width={width}
        fetchGifs={fetchItems}
        className={styles.grid}
        onGifClick={handleGifClick}
        noLink
        hideAttribution
      />
      <div className={styles.searchFooter}>
        <Button type="icon" onClick={() => setIsVisible({ type, visible: false })}>
          <CloseIcon />
        </Button>
        <TextInput
          onChange={(e) => setSearchKey(e.target.value)}
          onBlur={() => setIsVisible({ type, visible: false })}
          ref={inputRef}
          as="input"
          placeholder="Szukaj gifa"
        />
      </div>
    </>
  );
};

const Giphy = ({ type, setIsVisible, padding }) => (
  <GiphyProvider>
    <Components setIsVisible={setIsVisible} padding={padding} type={type} />
  </GiphyProvider>
);

Giphy.propTypes = {
  setIsVisible: PropTypes.func.isRequired,
  type: PropTypes.oneOf([contentTypes.animatedText, contentTypes.gif]),
  padding: PropTypes.number,
};

Giphy.defaultProps = {
  type: contentTypes.gif,
  padding: 0,
};

export default Giphy;
