// form validation
const validation = (form) => {
    let validate = true;
    let error = {};
    for (const [key, value] of Object.entries(form)) {
      if (value.length === 0) {
        error[key] = `${key[0].toUpperCase() + key.slice(1)} needs to fill.`;
        validate = false; // validation fails
      }
    }
    return { validate, error };
};

export {
    validation
}