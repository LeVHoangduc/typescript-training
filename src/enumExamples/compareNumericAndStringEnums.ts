enum Status {
  PENDING, // 0
  IN_PROGRESS, // 1
  DONE, // 2
  CANCELLED, // 3
}

Status["PENDING"]; // is 0
Status[0]; // is PENDING

enum MediaTypes {
  JSON = "application/json",
  XML = "application/xml",
}

MediaTypes["JSON"]; // "application/json"
MediaTypes["application/json"]; // undefined
