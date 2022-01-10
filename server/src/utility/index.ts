export const updateFields = (toUpdate: any, updated: any, ...fields: string[]) => {
  fields.forEach((field) => {
    const updatedValue = updated[field];
    if (updatedValue !== undefined && updatedValue !== null) toUpdate[field] = updatedValue;
  });
};

export const tryJsonParse = (val: any) => {
  try {
    return JSON.parse(val);
  } catch (e) {
    return null;
  }
};
