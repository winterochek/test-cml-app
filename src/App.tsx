import { Map } from './components/Map'

function App() {
   return (
      <div
         style={{
            display: 'flex',
            minHeight: '100vh',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
         }}
      >
         <Map />
      </div>
   )
}

export default App
