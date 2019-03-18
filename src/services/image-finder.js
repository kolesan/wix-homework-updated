export default function inst(...initialModules) {
  let modules = new Map();
  initialModules.forEach(module => modules.set(module.id, module));

  return Object.freeze({
    search(query, moduleId) {
      let module = modules.get(moduleId);
      if (!module) {
        throw Error(`Search module with id ${moduleId} not found.`);
      }

      return new Promise((resolve, reject) => {
        module.search(query)
          .then(images => resolve({query, images}))
          .catch(error => reject(error));
      });
    }
  });
}