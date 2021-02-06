import React, { useState } from "react";
import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: "_XLqFvap7OI7-wHvEhRys9uXt06wW4UTHcvnv7Si6PI",
});

export default function SearchPhotos() {
  const [query, setQuery] = useState("");
  const [pics, setPics] = useState([] as any);

  const searchPhotos = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    unsplash.search
      .getPhotos({ query: query, page: 1, perPage: 10 })
      .then((result) => {
        if (result.errors) {
          // handle error here
          console.log("error occurred: ", result.errors[0]);
        } else {
          // handle success here
          setPics(result.response.results);
        }
      });
  };

  return (
    <>
      <form className="form" onSubmit={searchPhotos}>
        <label className="label" htmlFor="query">
          {" "}
          Search free high resolution pictures:
        </label>
        <input
          type="text"
          name="query"
          className="input"
          placeholder={`Try 'doggo' or 'birb'`}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit" className="button">
          Search
        </button>
      </form>
      <div className="card-list">
        {pics.map((pic: { id: string; alt_description: string; urls: any }) => (
          <div className="card" key={pic.id}>
            <img
              className="card--image"
              alt={pic.alt_description}
              src={pic.urls.full}
              width="50%"
              height="50%"
            ></img>
          </div>
        ))}
      </div>
    </>
  );
}
