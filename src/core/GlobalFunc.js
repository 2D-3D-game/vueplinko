export function GlobalFunc() {
  const changePercent = (req) => {
    const sum = req.reduce((acc, val) => acc + val, 0);
    const res = req.map((val) => val / sum);
    return res;
  };

  const selectFromText = (rowNum, level, text, array) => {
    let selectedType = [];
    if (array === "color") {
      selectedType = colors;
    } else if (array === "shadow") {
      selectedType = shadows;
    } else {
      selectedType = probabilities;
    }
    const index = getIndexForColorAndPercent(rowNum, level, text);
    const select = selectedType["_" + rowNum][index];

    return select;
  };

  const getIndexForColorAndPercent = (rowNum, level, text) => {
    let index = 0;
    const selectedBasket = baskets[level]["_" + rowNum];
    for (let i = 0; i < selectedBasket.length; i++) {
      if (selectedBasket[i] === parseFloat(text)) {
        index = i;
        break;
      }
    }
    return index;
  };

  const baskets = {
    low: {
      _8: [13, 3, 1.3, 0.7, 0.4, 0.7, 1.3, 3, 13],
      _9: [18, 4, 1.7, 0.9, 0.5, 0.5, 0.9, 1.7, 4, 18],
      _10: [22, 5, 2, 1.4, 0.6, 0.4, 0.6, 1.4, 2, 5, 22],
      _11: [24, 6, 3, 1.8, 0.7, 0.5, 0.5, 0.7, 1.8, 3, 6, 24],
      _12: [33, 11, 4, 2, 1.1, 0.6, 0.3, 0.6, 1.1, 2, 4, 11, 33],
      _13: [43, 13, 6, 3, 1.3, 0.7, 0.4, 0.4, 0.7, 1.3, 3, 6, 13, 43],
      _14: [58, 15, 7, 4, 1.9, 1, 0.5, 0.2, 0.5, 1, 1.9, 4, 7, 15, 58],
      _15: [88, 18, 11, 5, 3, 1.3, 0.5, 0.3, 0.3, 0.5, 1.3, 3, 5, 11, 18, 88],
      _16: [
        110, 41, 10, 5, 3, 1.5, 1, 0.5, 0.3, 0.5, 1, 1.5, 3, 5, 10, 41, 110,
      ],
    },
    middle: {
      _8: [13, 3, 1.3, 0.7, 0.4, 0.7, 1.3, 3, 13],
      _9: [18, 4, 1.7, 0.9, 0.5, 0.5, 0.9, 1.7, 4, 18],
      _10: [22, 5, 2, 1.4, 0.6, 0.4, 0.6, 1.4, 2, 5, 22],
      _11: [24, 6, 3, 1.8, 0.7, 0.5, 0.5, 0.7, 1.8, 3, 6, 24],
      _12: [33, 11, 4, 2, 1.1, 0.6, 0.3, 0.6, 1.1, 2, 4, 11, 33],
      _13: [43, 13, 6, 3, 1.3, 0.7, 0.4, 0.4, 0.7, 1.3, 3, 6, 13, 43],
      _14: [58, 15, 7, 4, 1.9, 1, 0.5, 0.2, 0.5, 1, 1.9, 4, 7, 15, 58],
      _15: [88, 18, 11, 5, 3, 1.3, 0.5, 0.3, 0.3, 0.5, 1.3, 3, 5, 11, 18, 88],
      _16: [
        110, 41, 10, 5, 3, 1.5, 1, 0.5, 0.3, 0.5, 1, 1.5, 3, 5, 10, 41, 110,
      ],
    },
    high: {
      _8: [13, 3, 1.3, 0.7, 0.4, 0.7, 1.3, 3, 13],
      _9: [18, 4, 1.7, 0.9, 0.5, 0.5, 0.9, 1.7, 4, 18],
      _10: [22, 5, 2, 1.4, 0.6, 0.4, 0.6, 1.4, 2, 5, 22],
      _11: [24, 6, 3, 1.8, 0.7, 0.5, 0.5, 0.7, 1.8, 3, 6, 24],
      _12: [33, 11, 4, 2, 1.1, 0.6, 0.3, 0.6, 1.1, 2, 4, 11, 33],
      _13: [43, 13, 6, 3, 1.3, 0.7, 0.4, 0.4, 0.7, 1.3, 3, 6, 13, 43],
      _14: [58, 15, 7, 4, 1.9, 1, 0.5, 0.2, 0.5, 1, 1.9, 4, 7, 15, 58],
      _15: [88, 18, 11, 5, 3, 1.3, 0.5, 0.3, 0.3, 0.5, 1.3, 3, 5, 11, 18, 88],
      _16: [
        110, 41, 10, 5, 3, 1.5, 1, 0.5, 0.3, 0.5, 1, 1.5, 3, 5, 10, 41, 110,
      ],
    },
  };

  const probabilities = {
    _8: changePercent([1, 8, 28, 56, 70, 56, 28, 8, 1]),
    _9: changePercent([1, 9, 36, 84, 126, 126, 84, 36, 9, 1]),
    _10: changePercent([1, 10, 45, 120, 210, 252, 210, 120, 45, 10, 1]),
    _11: changePercent([1, 11, 55, 165, 330, 462, 462, 330, 165, 55, 11, 1]),
    _12: changePercent([
      1, 12, 66, 220, 495, 792, 924, 792, 495, 220, 66, 12, 1,
    ]),
    _13: changePercent([
      1, 13, 78, 186, 715, 1287, 1716, 1716, 1287, 715, 186, 78, 13, 1,
    ]),
    _14: changePercent([
      1, 14, 91, 264, 901, 2002, 3003, 3432, 3003, 2002, 901, 264, 91, 14, 1,
    ]),
    _15: changePercent([
      1, 15, 105, 355, 1165, 2903, 5005, 6435, 6435, 5005, 2903, 1165, 355, 105,
      15, 1,
    ]),
    _16: changePercent([
      1, 16, 120, 460, 1520, 4068, 7908, 11440, 12870, 11440, 7908, 4068, 1520,
      460, 120, 16, 1,
    ]),
  };

  const colors = {
    _8: [
      0xfa223e, 0xfa302f, 0xfa6020, 0xfa8f11, 0xfac000, 0xfa8f11, 0xfa6020,
      0xfa302f, 0xfa223e,
    ],
    _9: [
      0xfa223e, 0xfa302f, 0xfa6020, 0xfa8f11, 0xffac04, 0xffac04, 0xfa8f11,
      0xfa6020, 0xfa302f, 0xfa223e,
    ],
    _10: [
      0xfa223e, 0xff2632, 0xff4e27, 0xfa6020, 0xfa8f11, 0xfac000, 0xfa8f11,
      0xfa6020, 0xff4e27, 0xff2632, 0xfa223e,
    ],
    _11: [
      0xfa223e, 0xfa302f, 0xfa4527, 0xfa681e, 0xfa8c10, 0xfaaf06, 0xfaaf06,
      0xfa8c10, 0xfa681e, 0xfa4527, 0xfa2234, 0xfa223e,
    ],
    _12: [
      0xfa223e, 0xfa302f, 0xfa4527, 0xfa681e, 0xfa8c10, 0xfaa00c, 0xfac000,
      0xfaa00c, 0xfa7f17, 0xfa681e, 0xfa4527, 0xfa302f, 0xfa223e,
    ],
    _13: [
      0xfa223e, 0xfa2235, 0xfa4527, 0xfa5922, 0xfa7618, 0xfa940e, 0xfab104,
      0xfab104, 0xfa940e, 0xfa7618, 0xfa5922, 0xfa3a2c, 0xfa223e, 0xfa223e,
    ],
    _14: [
      0xfa223e, 0xfa223e, 0xfa302f, 0xfa5224, 0xfa681e, 0xfa8c10, 0xfaa00c,
      0xfac000, 0xfaa00c, 0xfa7f17, 0xfa6e1b, 0xfa5224, 0xfa362d, 0xfa223e,
      0xfa223e,
    ],
    _15: [
      0xfa223e, 0xfa223e, 0xfa2235, 0xfa4527, 0xfa5922, 0xfa7618, 0xfa940e,
      0xfab104, 0xfab104, 0xfa940e, 0xfa7618, 0xfa5922, 0xfa3a2c, 0xfa223e,
      0xfa223e, 0xfa223e,
    ],
    _16: [
      0xfa223e, 0xfa223e, 0xfa223e, 0xfa302f, 0xfa5224, 0xfa681e, 0xfa8c10,
      0xfaa00c, 0xfac000, 0xfaa00c, 0xfa7f17, 0xfa6e1b, 0xfa5224, 0xfa362d,
      0xfa223e, 0xfa223e, 0xfa223e,
    ],
  };

  const shadows = {
    _8: [
      0xa61304, 0xa61302, 0xa81302, 0xaa4b00, 0xab7902, 0xaa4b00, 0xa81302,
      0xa61302, 0xa61304,
    ],
    _9: [
      0xa61304, 0xa61302, 0xa81302, 0xaa4b00, 0xab7902, 0xab7902, 0xaa4b00,
      0xa81302, 0xa61302, 0xa61304,
    ],
    _10: [
      0xa61304, 0xa61302, 0xa81302, 0xaa4b00, 0xab7902, 0xab7902, 0xaa4b00,
      0xa81302, 0xa61302, 0xa61304, 0xa61304,
    ],
    _11: [
      0xa61304, 0xa61302, 0xa81302, 0xa81a02, 0xa94700, 0xab6900, 0xab6900,
      0xa94700, 0xa81a02, 0xa71302, 0xa61302, 0xa61304,
    ],
    _12: [
      0xa61304, 0xa61302, 0xa81302, 0xa81a02, 0xa94700, 0xab6900, 0xab7902,
      0xab6900, 0xa93a00, 0xa71302, 0xa61302, 0xa61304, 0xa61304,
    ],
    _13: [
      0xa61304, 0xa61302, 0xa81302, 0xa81a02, 0xa94700, 0xaa4f00, 0xab6b01,
      0xab6b01, 0xaa4f00, 0xa94700, 0xa81a02, 0xa81302, 0xa61302, 0xa61304,
    ],
    _14: [
      0xa61304, 0xa61304, 0xa61302, 0xa71302, 0xa81a02, 0xa94700, 0xab6900,
      0xab7902, 0xab6900, 0xa94700, 0xa81a02, 0xa71302, 0xa61302, 0xa61304,
      0xa61304,
    ],
    _15: [
      0xa61304, 0xa61304, 0xa61302, 0xa81302, 0xa81a02, 0xa94700, 0xaa4f00,
      0xab6b01, 0xab6b01, 0xaa4f00, 0xa94700, 0xa81a02, 0xa81302, 0xa61302,
      0xa61304, 0xa61304,
    ],
    _16: [
      0xa61304, 0xa61304, 0xa61304, 0xa61302, 0xa71302, 0xa81a02, 0xa94700,
      0xab6900, 0xab6900, 0xab7902, 0xa94700, 0xa81a02, 0xa71302, 0xa61302,
      0xa61304, 0xa61304, 0xa61304,
    ],
  };

  const initialDrawValue = {
    ParticleRadius: 12,
    GapWidth: 10,
    PointRadius: 8,
    MapGap: 3,
  };

  return {
    baskets,
    probabilities,
    colors,
    shadows,
    initialDrawValue,
    selectFromText,
  };
}
