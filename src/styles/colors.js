const defaultColors = {
  primary: '#FDA214',
  secondary: '#6395B8',
  lightGray: '#BCCED9',
  gray: '#7191A5',
  dark: '#304859',
  veryDark: '#152938',
  light: '#F2F2F2',
  veryLight: '#FCFCFC'
}

export const colors = {
  ...defaultColors,
  buttons: {
    btnPrimary: {
      bg: {
        idle: defaultColors.primary,
        hover: '#FFB84A'
      },
      font: defaultColors.veryLight
    },
    btnSecondary: {
      bg: {
        idle: '#DFE7EC',
        hover: defaultColors.secondary
      },
      font: {
        idle: defaultColors.dark,
        hover: defaultColors.veryLight
      }
    },
    menuSelection: {
      bg: {
        idle: defaultColors.lightGray,
        hover: defaultColors.secondary,
        active: defaultColors.dark
      },
      font: defaultColors.veryLight
    }
  }
}
