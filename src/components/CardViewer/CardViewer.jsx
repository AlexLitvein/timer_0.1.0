import React, { useState } from 'react';

import CardViewerStyles from './CardViewer.module.css';

export const CardList = ({ list }) => {
  const renderList = () => {
    return list.map((el) => el);
  };
  return (
    <div className={CardViewerStyles.cardList}>
      {/* {renderList} */}
      {list}
    </div>
  );
};

export const CardViewer = (props) => {
  return (
    <div className={CardViewerStyles.cardViewer}>
      <div className={CardViewerStyles.cardView}>dgfdgf</div>
      <CardList {...props} />
    </div>
  );
};
