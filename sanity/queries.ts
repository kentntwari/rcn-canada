import groq from 'groq'

export const EVENTS_QUERY = groq`*[_type == "event"]{
    date,
      isMainEvent,
      name,
      slug,
       "poster": poster.asset->{
      url,
      metadata{
        lqip,
      }}
  
  }`
