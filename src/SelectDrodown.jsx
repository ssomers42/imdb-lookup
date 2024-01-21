import { useState } from 'react';

//TODO: Dropdown component where you can select multiple genres

export const SelectDropdown = ({ genreRef }) => {
  const menuItems = [
    'Any',
    'Action',
    'Adventure',
    'Animation',
    'Biography',
    'Comedy',
    'Crime',
    'Documentary',
    'Drama',
    'Family',
    'Fantasy',
    'History',
    'Horror',
    'Music',
    'Musical',
    'Mystery',
    'Romance',
    'Sci-fi',
    'Short',
    'Sport',
    'Thriller',
    'War',
    'Western',
  ];

  const dropdownOptions = menuItems.map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  ));
  //text field
  //Show selected item
  //On click, show all menu items
  //On click off, close menu
  return (
    <select name="genre" id="genre" ref={genreRef}>
      {dropdownOptions}
    </select>
  );
};
