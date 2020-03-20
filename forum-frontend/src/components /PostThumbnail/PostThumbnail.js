import React from 'react';

import imageNotAvailable from '../../assets/images/noImage.png';
import {apiURL} from "../../constants";
import {CardImg} from "reactstrap";

const styles = {
  width: '100px',
  height: '100px',
  marginRight: '10px'
};

const PostThumbnail = props => {
  let image = imageNotAvailable;

  if (props.image) {
    image = apiURL + '/uploads/' + props.image;
  }

  return <CardImg alt="product" src={image} style={styles} className="img-thumbnail" />;
};

export default PostThumbnail;