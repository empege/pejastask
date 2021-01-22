import React from 'react'
import c from './weatherImg/c.svg';
import h from './weatherImg/h.svg';
import hc from './weatherImg/hc.svg';
import hr from './weatherImg/hr.svg';
import lc from './weatherImg/lc.svg';
import lr from './weatherImg/lr.svg';
import s from './weatherImg/s.svg';
import sl from './weatherImg/sl.svg';
import sn from './weatherImg/sn.svg';
import t from './weatherImg/t.svg';

const WeatherIcon = ({ abbr }) => {
  let image;
  if (abbr === 'c') {
    image = c;
  }
  if (abbr === 'h') {
    image = h;
  }
  if (abbr === 'hc') {
    image = hc;
  }
  if (abbr === 'hr') {
    image = hr;
  }
  if (abbr === 'lc') {
    image = lc;
  }
  if (abbr === 'lr') {
    image = lr;
  }
  if (abbr === 's') {
    image = s;
  }
  if (abbr === 'sl') {
    image = sl;
  }
  if (abbr === 'sn') {
    image = sn;
  }
  if (abbr === 't') {
    image = t;
  }
  return (
    <img src={image} alt={abbr} />
  )
}

export default WeatherIcon
