import { StyleSheet } from 'react-native'

const DEFAULT_LABEL_COLOR = '#ccc'
const DEFAULT_LINE_COLOR = '#dad9d4'

export default ({ horizontal, labelWrapperFlex, unitFlex }) => {
  let contentContainerWrapperFlexDirection
  let graduationUnitsFlexDirection

  if (horizontal) {
    contentContainerWrapperFlexDirection = 'column'
    graduationUnitsFlexDirection = 'row'
  } else {
    contentContainerWrapperFlexDirection = 'row'
    graduationUnitsFlexDirection = 'column'
  }

  return StyleSheet.create({
    container: {
      flex: 1,
    },

    graduationUnits: {
      flex: 1,
      flexDirection: graduationUnitsFlexDirection,
    },

    contentContainerWrapper: {
      backgroundColor: 'transparent',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,

      flexDirection: contentContainerWrapperFlexDirection,
    },
    contentContainerLabelWrapperOffset: {
      backgroundColor: 'transparent',
      flex: labelWrapperFlex,
    },
    contentContainer: {
      backgroundColor: 'transparent',
      flex: unitFlex,
    }
  })
}