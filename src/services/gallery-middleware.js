export default function inst(imageFinder) {
  let lastRequestId = 0;
  return Object.freeze({
    search(query, moduleId) {
      let requestId = ++lastRequestId;
      console.log("Request", query, "id:", requestId, "accepted");
      return imageFinder.search(query, moduleId)
        .then(results => {
          console.log("Request", query, "id:", requestId, "fullfiled. Last request id is: ", lastRequestId);
          if (requestId != lastRequestId) {
            return Promise.reject("Newer request in progress");
          }
          return results;
        });
    }
  });
}