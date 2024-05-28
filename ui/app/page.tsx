import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function Home() {
  return (
    <div className='flex flex-col h-screen'>
      {/* HEADER */}
      <Header selectedTab='Some text' />

      {/* Body */}
      <main className='container mx-auto p-4 h-screen flex flex-col flex-grow'>
        <div className='flex space-x-4 mb-4'>
          <h1>Here comes the list etc</h1>
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
