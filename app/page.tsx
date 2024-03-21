"use client"
import React, { useState } from "react"
import { parse } from "csv-parse"

function CsvToTextConverter() {
  const [text, setText] = useState("")

  function csvToJson(csv: any) {
    const lines = csv.trim().split("\n")
    const headers = lines.shift().split(",")
    const jsonArray: any[] = []

    lines.forEach((line: any) => {
      const values = line.split(",")
      const jsonObject: any = {}

      headers.forEach((header: any, index: any) => {
        jsonObject[header] = values[index]
      })

      jsonArray.push(jsonObject)
    })

    return jsonArray
  }

  const handleFileChange = (event: any) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()

    reader.onload = async (e: any) => {
      const csv = e.target.result
      const parsedData = (await parseCsv(csv)) as any
      const text = parsedData.join("\n")
      setText(text)
    }

    reader.readAsText(file)
  }

  const parseCsv = async (csv: any) => {
    return new Promise((resolve, reject) => {
      parse(csv, (err: any, data: any) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  return (
    <div className="min-h-screen max-h-full grid place-content-center py-10">
      <input
        type="file"
        onChange={handleFileChange}
        className="border border-gray-400 p-2 rounded-xl"
      />
      <div className="flex items-center flex-col max-w-[500px] rounded-xl  p-2">
        <h2 className="text-2xl font-bold">Output :</h2>
        <p>{JSON.stringify(csvToJson(text))}</p>
      </div>
    </div>
  )
}

export default CsvToTextConverter
