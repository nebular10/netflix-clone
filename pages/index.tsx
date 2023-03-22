

import { getSession } from 'next-auth/react';
import { NextPageContext } from 'next';
import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorite';
import InfoModal from '@/components/infoModal';
import useInfoModal from '@/hooks/useInfoModal';


export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if(!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
} 

export default function Home() {
  const { data: movies = []} = useMovieList();
  const { data: favorites = []} = useFavorites();
  const { isOpen, closeModal } = useInfoModal();
  console.log(movies);
  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal}/>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Populaire en ce moment" data={movies} />
        <MovieList title="Ma playlist" data={favorites} />
      </div>
      
    </>
  )
}
