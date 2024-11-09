
import {useState,useEffect} from 'react'

const useFetch = (url = "") => {
  const [ data, setData ] = useState( [] )
  const [ loading, setLoading ] = useState( true )
  const [ error, setError ] = useState(null)
  
  useEffect( () => {
    const abortController = new AbortController()
    fetch( url )
      .then( response  => response.json() )
      .then( data => setData( data ) )
      .catch( error => setError( error ) )
      .finally( () => setLoading( false ) )
      return () => abortController.abort()
  }, [url] )
  return {data,loading,error}
}

export default useFetch

