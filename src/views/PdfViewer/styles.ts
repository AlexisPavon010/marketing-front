import { StyleSheet } from '@react-pdf/renderer';


export const styles = StyleSheet.create({
  page: {
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "white",
    padding: 10,
  },
  username: {
    fontSize: "36px",
    textAlign: 'center',
    marginBottom: '20px'
  },
  title: {
    fontSize: '14px',
    marginBottom: '8px'
  },
  category: {
    fontSize: '14px',
    marginBottom: '8px'
  },
  brand: {
    fontSize: '14px',
    marginBottom: '8px'
  },
  date: {},
  subtitle: {},
  description_title: {
    textAlign: 'center',
    marginBottom: '16px'
  },
  description: {
    fontSize: '12px',
    marginBottom: '16px'
  },
  duration: {
    fontSize: '14px',
    marginBottom: '16px'
  },
  core_target_title: {
    textAlign: 'center',
    fontSize: '14px',
    marginBottom: '16px'
  },
  core_target: {
    fontSize: '12px',
    marginBottom: '16px'
  },
  result: {},

  image_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '16px',
    marginBottom: '16px'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
})