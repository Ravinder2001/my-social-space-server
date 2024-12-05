let ModuleColumnNames = {
  SALUTATION: [{ header: "Name", type: "string" }],
  VIP_LEVEL: [
    { header: "Name", type: "string" },
    { header: "Description", type: "string" },
  ],
  ROOM_TYPE: [
    { header: "Code", type: "string" },
    { header: "Description", type: "string" },
  ],
  ROOM: [
    { header: "Code", type: "select" },
    { header: "Description", type: "string" },
  ],
  PUBLIC_AREA: [{ header: "Name", type: "string" }],
  LOYALTY: [{ header: "Name", type: "string" }],
  MEMBERSHIP_LEVEL: [
    { header: "Loyalty Program", type: "select" },
    { header: "Name", type: "string" },
  ],
  DEPARTMENT: [{ header: "Name", type: "string" }],
  SUB_DEPARTMENT: [
    { header: "Department", type: "select" },
    { header: "Name", type: "string" },
  ],
  SECTION: [
    { header: "Sub Department", type: "select" },
    { header: "Name", type: "string" },
  ],
  PAYMENT_MODE: [{ header: "Name", type: "string" }],

  HSN_CODE: [
    { header: "Code", type: "string" },
    { header: "Description", type: "string" },
  ],
  REASON_TYPE: [{ header: "Name", type: "string" }],
  PHOTO_ID_TYPE: [{ header: "Name", type: "string" }],
  ASSET_CATEGORY: [{ header: "Name", type: "string" }],
  ASSET_SUB_CATEGORY: [
    { header: "Asset Category", type: "select" },
    { header: "Name", type: "string" },
  ],
  INVENTORY_TYPE: [
    { header: "Department", type: "select" },
    { header: "Name", type: "string" },
  ],
  INVENTORY_ITEM: [
    { header: "Inventory Type", type: "select" },
    { header: "Name", type: "string" },
  ],
  TASK_CATEGORY: [{ header: "Name", type: "string" }],
  INCIDENT_CATEGORY: [{ header: "Name", type: "string" }],
  INCIDENT_SOURCE: [{ header: "Name", type: "string" }],
  LF_ARTICLE_TYPE: [
    { header: "Name", type: "string" },
    { header: "Storage Days", type: "string" },
  ],
  LF_STORAGE: [{ header: "Name", type: "string" }],
};

module.exports = ModuleColumnNames;
