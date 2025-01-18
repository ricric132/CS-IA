import React from 'react';
import { Page, Text, View, Document, StyleSheet, renderToStream } from '@react-pdf/renderer';
import { GenerateReportPDFData } from '@/lib/actions';
import { NextResponse } from 'next/server';
import { Readable } from 'stream';
import { json } from 'stream/consumers';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  title:{
    fontFamily : "Times-Roman",
    fontSize: "30px"
  },
  header:{
    fontFamily : "Times-Roman",
    fontSize: "20px"
  },
  text:{
    fontFamily : "Times-Roman",
    fontSize: "14px"
  },
});

// Create Document Component
const MyDocument = ({Prev, Cur, taskMap}) => (
  <Document>
    <Page style={styles.section}>
        <Text style={styles.header}>Report from {Prev.date.toDateString()} to {Cur.date.toDateString()}</Text>
        <Text>_______________________________________________________</Text>
        <Text style={styles.header}>Current Task Status</Text>
        <Text style={styles.text}> </Text>
        {taskMap.map((task) => (
          <>
            {(task[0] < Cur.tasks.length && task[0] >= 0) &&
              <>
                {(task[1] < Prev.tasks.length && task[1] >= 0 && Prev.tasks[task[1]].name != Cur.tasks[task[0]].name)
                  ? <Text style={styles.text}>Name: {Prev.tasks[task[1]].name} {"   =>   "} {Cur.tasks[task[0]].name}</Text>
                  : <Text style={styles.text}>Name: {Cur.tasks[task[0]].name}</Text>
                }

                {(task[1] < Prev.tasks.length && task[1] >= 0 && Prev.tasks[task[1]].status != Cur.tasks[task[0]].status)
                  ? <Text style={styles.text}>Status: {Prev.tasks[task[1]].status} {"   =>   "} {Cur.tasks[task[0]].status}</Text>
                  : <Text style={styles.text}>Status: {Cur.tasks[task[0]].status}</Text>
                }

                <Text style={styles.text}>Assigned user: {Cur.tasks[task[0]].assigned? Cur.tasks[task[0]].assigned.username : "None"}</Text>

                <Text style={styles.text}> </Text>
              </>
            }
          </>
        ))}
    </Page>
  </Document>
);

function taskFormatter(){
  
}

export async function GET(request: Request, {params}: {params: {reportId: string;}}){
  const {current, prev, taskMap} = await GenerateReportPDFData(params.id)

  
  
  const stream= await renderToStream(<MyDocument Cur={current} Prev={prev} taskMap={taskMap}/>)
  return new NextResponse(stream as unknown as ReadableStream)
}