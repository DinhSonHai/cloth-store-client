import React, { Fragment, useEffect, useState, useRef } from 'react';
import { Arrow } from '../../../assets/icons';
import { useHistory } from 'react-router-dom';
import config from '../../../config/default.json';
// import PropTypes from 'prop-types';

import './styles.scss';

SelectBox.propTypes = {

};

function SelectBox({ handleSort, sortState, setSortState }) {
  const history = useHistory();

  const [isOpen, setOpen] = useState(false);
  const wrapperRef = useRef();

  const handleOpen = () => {
    setOpen(!isOpen);
  }

  const handleSelect = (type) => {
    if (type === 'name') {
      setSortState('Name: A-Z');
    }
    else if (type === 'asc') {
      setSortState('Price: Asc');
    }
    else if (type === 'desc') {
      setSortState('Price: Desc');
    }
    handleSort(type);
    setOpen(false);
  }

  const close = (e) => {
    const { target } = e;
    if (!wrapperRef?.current?.contains(target)) {
      setOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener('click', close);
    return () => {
      document.removeEventListener('click', close)
    }
  }, []);

  return (
    <div className="select-box" ref={wrapperRef}>
      <div className="select" onClick={handleOpen}>
        <p className="sort-by">Sort By:</p>
        <p className="type">{sortState}</p>
        <span className={isOpen ? "rotate" : ""}>
          <Arrow />
        </span>
      </div>
      {isOpen && (
        <div className="option">
          <p onClick={() => handleSelect('name')}>Name: A - Z</p>
          <p onClick={() => handleSelect('asc')}>Price: lowest to highest</p>
          <p onClick={() => handleSelect('desc')}>Price: highest to lowest</p>
        </div>
      )}
    </div>
  );
}

export default SelectBox;
