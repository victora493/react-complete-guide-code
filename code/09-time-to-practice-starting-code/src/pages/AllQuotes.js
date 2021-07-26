import { useEffect } from 'react';

import QuoteList from '../components/quotes/QuoteList';
import NoQuotesFound from '../components/quotes/NoQuotesFound';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useHttp from '../hooks/use-http'
import { getAllQuotes } from '../lib/api';

const AllQuotes = () => {
  const { sendRequest, status, data: loadedData, error } = useHttp(getAllQuotes, true)

  useEffect(() => {
    sendRequest()
  }, [sendRequest])

  if(status === 'pending') return (
    <div className='centered'>
      <LoadingSpinner />
    </div>
  )

  if(status === 'error') return (
    <p className='centered focused'>
      {error}
    </p>
  )

  if(status === 'completed' && (!loadedData || loadedData.length === 0)) return <NoQuotesFound/>

  return <QuoteList quotes={loadedData} />
};

export default AllQuotes;