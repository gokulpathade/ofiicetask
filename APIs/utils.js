function createError(error) {
  return { status: "error", error };
}

function createSuccess(data) {
  return { status: "success", data };
}

function createResult(error, data) {
  const result = {};
  if (error) {
    result["status"] = "error";
    result["error"] = error;
  } else {
    result["status"] = "success";
    result["data"] = data;
  }

  return result;
}

module.exports = {
  createResult,
  createError,
  createSuccess,
};
