
"use client";

import * as React from "react";

export default function AdminProductionForm({ initial }: { initial: Record<string, any> }) {
  const [data, setData] = React.useState(initial);

  // This is a placeholder form. 
  // Please provide the code for the actual form component.

  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={data.title || ''}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
      </div>
       <div>
        <label htmlFor="summary" className="block text-sm font-medium text-gray-700">Summary</label>
        <textarea
          name="summary"
          id="summary"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={data.summary || ''}
          onChange={(e) => setData({ ...data, summary: e.target.value })}
        />
      </div>
      <pre className="p-4 bg-gray-100 rounded-md overflow-x-auto text-xs">
        {JSON.stringify(data, null, 2)}
      </pre>
      <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        disabled
      >
        Save (disabled)
      </button>
    </form>
  );
}
