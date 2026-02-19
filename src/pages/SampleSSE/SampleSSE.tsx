/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react'
import { useMatches } from "react-router-dom";

const SampleSSE = () => {

    const [data, setData] = useState([]);
    const [fileContent, setFileContent] = useState('');

    const lastEventRef = useRef(null);

    const matches = useMatches();

    console.log('Matches: ', matches)

    // useEffect(() => {
    //     const eventSource = new EventSource(`http://localhost:4000/streaming-test`);
    //     eventSource.addEventListener("interval", (event) => {
    //         if (lastEventRef?.current && lastEventRef?.current?.lastEventId === event.lastEventId) {
    //             return;
    //         }
    //         if (event.data) {
    //             lastEventRef.current = { lastEventId: event.lastEventId };
    //             setData(prev => ([...prev, JSON.parse(event.data)]))
    //         }
    //     });
    //     eventSource.addEventListener("done", (event) => {
    //         eventSource.close();
    //     });

    //     return () => eventSource.close();
    // }, [])

    useEffect(() => {
        const eventSource = new EventSource(`http://localhost:4000/streaming-file`);
        eventSource.addEventListener("fileRead", (event) => {
            const { chunk } = JSON.parse(event.data)
            setFileContent(prev => prev + chunk);
        });
        eventSource.addEventListener("done", () => {
            eventSource.close();
        });

        return () => eventSource.close();
    }, [])

    return (
        <>
            <div>SampleSSE</div>
            {
                data &&
                (<ul>
                    {data.map((row: any) => (
                        <li key={row.id}>{row.message}</li>
                    ))}
                </ul>)
            }
            <h4>File contents:</h4>
            <pre>{fileContent}</pre>
        </>
    );
}

export default SampleSSE