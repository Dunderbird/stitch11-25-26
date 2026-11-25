import { Route, Routes } from 'react-router-dom'
import CharacterArtPage from './pages/CharacterArtPage'
import CharactersPage from './pages/CharactersPage'
import CounterPage from './pages/CounterPage'
import GalleryPage from './pages/GalleryPage'
import NotFound from './pages/NotFound'
import { artCharacters } from './data/characters'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CounterPage />} />
      <Route path="/characters" element={<CharactersPage />} />
      <Route path="/mamma-mia" element={<CounterPage variant="prototype" />} />
      <Route path="/gallery" element={<GalleryPage />} />
      {artCharacters.map((character) => (
        <Route
          key={character.slug}
          path={`/gallery/${character.slug}`}
          element={<CharacterArtPage character={character} />}
        />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
