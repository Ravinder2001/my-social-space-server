-- Super Admin tables
CREATE TABLE IF NOT EXISTS tbl_super_admin ( 
  user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username VARCHAR(255) NOT NUll,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_country_list (
  country_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  country_name VARCHAR(255) NOT NULL UNIQUE,
  country_code VARCHAR(10) NOT NULL UNIQUE, 
  currency_code VARCHAR(10) NOT NULL ,
  currency_name VARCHAR(255) NOT NULL,
  country_dial_code VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_common_options(
  option_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  option_name VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_address (
  address_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  address_line_1 VARCHAR(255),
  address_line_2 VARCHAR(255),
  postal_code VARCHAR(255),
  city VARCHAR(255),
  country_id INTEGER NOT NULL REFERENCES tbl_country_list(country_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_master_document_type (
  document_type_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(255) UNIQUE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_organization (  
  organization_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  company_code VARCHAR(255) NOT NULL UNIQUE,
  company_name VARCHAR(255) NOT NULL,
  brand_name VARCHAR(255) NOT NULL,
  brand_logo TEXT,
  address_id INTEGER NOT NULL REFERENCES tbl_address(address_id),
  location VARCHAR(255) NOT NULL,
  mobile_no VARCHAR(20) NOT NULL,
  currency_id INTEGER NOT NULL REFERENCES tbl_country_list(country_id),
  email VARCHAR(255) NOT NULL UNIQUE,
  gstn VARCHAR(255) NOT NULL UNIQUE,
  gstn_image TEXT NOT NULL,
  fssai_number VARCHAR(255) UNIQUE,
  fssai_image TEXT,
  room_count INT NOT NULL,
  table_count INT,
  valid_till VARCHAR(255) NOT NULL,
  extend_till VARCHAR(255),
  check_in_time VARCHAR(255),
  check_out_time VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_bank_details ( 
  bank_detail_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id),
  account_name VARCHAR(255) NOT NULL,
  account_number VARCHAR(255) NOT NULL,
  bank_name VARCHAR(255) NOT NULL,
  branch_name VARCHAR(255) NOT NULL,
  ifsc_code VARCHAR(255) NOT NULL,
  bic_swift_code VARCHAR(255),
  iban VARCHAR(255),
  upi_id VARCHAR(255),
  qr_image TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_master_user (
  master_user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id),
  restrict_user_location BOOLEAN DEFAULT FALSE NOT NULL,
  user_image TEXT,
  employee_id VARCHAR(255) NOT NULL UNIQUE,
  salutation_id INTEGER NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  address_id INT NOT NULL,
  nationality_id INTEGER NOT NULL REFERENCES tbl_master_nationality(nationality_id),
  mobile_no VARCHAR(20) NOT NULL,
  email VARCHAR(255) UNIQUE,
  dob VARCHAR(255),
  document_type_id INT NOT NULL REFERENCES tbl_master_document_type(document_type_id),
  document_number VARCHAR(255) NOT NULL,
  document_image VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  is_password_reset BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_master_section (
  section_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  section_name VARCHAR(255) NOT NULL UNIQUE,
  section_code VARCHAR(255) NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_master_modules (
  module_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  section_id INT NOT NULL REFERENCES tbl_master_section(section_id),
  module_name VARCHAR(255) NOT NULL UNIQUE,
  module_code VARCHAR(255) NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_master_modules_permissions (
  module_permission_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  module_id INT NOT NULL REFERENCES tbl_master_modules(module_id),
  permission_name VARCHAR(255) NOT NULL,
  permission_code VARCHAR(255) NOT NULL UNIQUE,
  panel_name VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_master_taxs (
  master_tax_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_master_nationality (
  nationality_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_master_alarm_sound(
  alarm_sound_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  sound_name VARCHAR(255) NOT NULL,
  sound_url VARCHAR(1000) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_master_user_mac_ids(
  mac_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  master_user_id INT NOT NULL REFERENCES tbl_master_user(master_user_id),
  mac_no VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_master_user_levels(
  user_level_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  level INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_master_ticket_status(
  status_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  status VARCHAR(255) NOT NULL,
  color VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_master_incident_status(
  status_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  status VARCHAR(255) NOT NULL,
  color VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_master_lost_and_found_status(
  status_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  status VARCHAR(255) NOT NULL,
  color VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_master_task_manager_status(
  status_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  status VARCHAR(255) NOT NULL,
  color VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_master_asset_status(
  status_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  status VARCHAR(255) NOT NULL,
  color VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Some important tables

CREATE TABLE IF NOT EXISTS tbl_user_activity(
  activity_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INT NOT NULL REFERENCES tbl_users(user_id),
  organization_id INT,
  action TEXT NOT NULL,
  target_id VARCHAR(255),
  ip_address VARCHAR(255),
  user_agent VARCHAR(255),
  mac_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_files_trash(
  tash_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  file TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AYS Tables

CREATE TABLE IF NOT EXISTS tbl_salutations (
  salutation_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_vip_level (
  vip_level_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_zones(
  zone_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_room_type(
  room_type_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  room_code VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_rooms(
  room_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  room_type_id INT NOT NULL REFERENCES tbl_room_type(room_type_id) ON DELETE CASCADE,
  zone_id INT NOT NULL REFERENCES tbl_zones(zone_id) ON DELETE CASCADE,
  room_name VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_public_area(
  public_area_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_loyalty_program (
  loyalty_program_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_membership_level (
  membership_level_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  loyalty_program_id INT NOT NULL REFERENCES tbl_loyalty_program(loyalty_program_id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_department(
  department_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_sub_department(
  sub_department_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  department_id INTEGER NOT NULL REFERENCES tbl_department(department_id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_section(
 section_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
 sub_department_id INTEGER NOT NULL REFERENCES tbl_sub_department(sub_department_id) ON DELETE CASCADE,
 name VARCHAR(255) NOT NULL,
 is_active BOOLEAN DEFAULT TRUE,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_payment_mode(
 payment_mode_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
 name VARCHAR(255) NOT NULL,
 is_active BOOLEAN DEFAULT TRUE,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_tax (
  tax_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(255) NOT NULL,
  tax_rate  NUMERIC(5, 2) NOT NULL,
  tax_type INT NOT NULL REFERENCES tbl_common_options(option_id),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_service_charge (
  service_charge_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(255) NOT NULL,
  service_charge_rate  NUMERIC(5, 2) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_service_charge_tax (
  service_charge_tax_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  service_charge_id INT NOT NULL REFERENCES tbl_service_charge(service_charge_id) ON DELETE CASCADE,
  tax_id INT NOT NULL REFERENCES tbl_tax(tax_id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_hsn_code(
  hsn_code_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  code VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_identification_type(
  identification_type_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_user_level(
  user_level_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  level INT NOT NULL REFERENCES tbl_master_user_levels(level),
  description VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_user_level_permissions(
  user_level_permission_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_level_id INT NOT NULL REFERENCES tbl_user_level(user_level_id),
  module_id INT NOT NULL REFERENCES tbl_master_modules(module_id),
  module_permission_id INT NOT NULL REFERENCES tbl_master_modules_permissions(module_permission_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_users(
  user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  username VARCHAR(255) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  user_image TEXT,
  restrict_user_location BOOLEAN DEFAULT FALSE NOT NULL,
  employee_id VARCHAR(255) NOT NULL UNIQUE,
  salutation_id INTEGER NOT NULL REFERENCES tbl_salutations(salutation_id),
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  address_id INTEGER NOT NULL REFERENCES tbl_address(address_id),
  nationality_id INTEGER NOT NULL REFERENCES tbl_master_nationality(nationality_id),
  mobile_no VARCHAR(20) NOT NULL,
  email VARCHAR(255) UNIQUE,
  dob VARCHAR(255),
  department_id INTEGER NOT NULL REFERENCES tbl_department(department_id),
  sub_department_id INTEGER NOT NULL REFERENCES tbl_sub_department(sub_department_id),
  section_id INTEGER NOT NULL REFERENCES tbl_section(section_id),
  designation VARCHAR(255) NOT NULL,
  user_level_id INTEGER NOT NULL REFERENCES tbl_user_level(user_level_id),
  reporting_to INTEGER,
  identification_type_id INT,
  document_number VARCHAR(255),
  document_image TEXT,
  has_admin_access BOOLEAN DEFAULT FALSE NOT NULL,
  has_master_admin_access BOOLEAN DEFAULT FALSE NOT NULL,
  is_password_reset BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_user_modules(
  user_module_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INT NOT NULL REFERENCES tbl_users(user_id) ON DELETE CASCADE,
  module_id INT NOT NULL REFERENCES tbl_master_modules(module_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_user_module_permissions(
  user_module_permission_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INT NOT NULL REFERENCES tbl_users(user_id) ON DELETE CASCADE,
  module_id INT NOT NULL REFERENCES tbl_master_modules(module_id),
  module_permission_id INT NOT NULL REFERENCES tbl_master_modules_permissions(module_permission_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_user_mac_ids(
  user_mac_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INT NOT NULL REFERENCES tbl_users(user_id),
  mac_no VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_reason_type(
  reason_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_asset_category(
  asset_category_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_asset_sub_category(
  asset_sub_category_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  category_id INT NOT NULL REFERENCES tbl_asset_category(asset_category_id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_assets(
  asset_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  make VARCHAR(255),
  color VARCHAR(255),
  category_id INT NOT NULL REFERENCES tbl_asset_category(asset_category_id),
  sub_category_id INT NOT NULL REFERENCES tbl_asset_sub_category(asset_sub_category_id),
  end_of_life VARCHAR(255),
  status INT REFERENCES tbl_master_asset_status(status_id),
  vendor_id INT,
  cost_price DECIMAL,
  purchase_date VARCHAR(255),
  warranty_until VARCHAR(255),
  department_id INT REFERENCES tbl_department(department_id),
  location VARCHAR(255),
  end_of_life_department_id INT REFERENCES tbl_department(department_id),
  end_of_life_user_level_id INT REFERENCES tbl_user_level(user_level_id),
  end_of_insurance_department_id INT REFERENCES tbl_department(department_id),
  end_of_insurance_user_level_id INT REFERENCES tbl_user_level(user_level_id),
  end_of_warranty_department_id INT REFERENCES tbl_department(department_id),
  end_of_warranty_user_level_id INT REFERENCES tbl_user_level(user_level_id),
  service_due_department_id INT REFERENCES tbl_department(department_id),
  service_due_user_level_id INT REFERENCES tbl_user_level(user_level_id),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_asset_insurances(
  asset_insurance_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  asset_id INT NOT NULL REFERENCES tbl_assets(asset_id) ON DELETE CASCADE,
  vendor_id INT,
  policy_number VARCHAR(255),
  expiry_date VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_asset_services(
  asset_service_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  asset_id INT NOT NULL REFERENCES tbl_assets(asset_id) ON DELETE CASCADE,
  service_date VARCHAR(255),
  service_status INT REFERENCES tbl_common_options(option_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_asset_images(
  asset_image_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  asset_id INT NOT NULL REFERENCES tbl_assets(asset_id) ON DELETE CASCADE,
  image TEXT NOT NULL,
  module VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_guest_chat_text(
  guest_chat_text_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL UNIQUE REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  start_conv_text TEXT NOT NULL,
  end_conv_text TEXT NOT NULL,
  no_res_text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_inventory_type(
  inventory_type_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  department_id INT NOT NULL REFERENCES tbl_department(department_id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_inventory_item(
  inventory_item_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  inventory_type_id INT NOT NULL REFERENCES tbl_inventory_type(inventory_type_id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_checklist(
  checklist_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_checklist_actions(
  checklist_action_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  checklist_id INT NOT NULL REFERENCES tbl_checklist(checklist_id) ON DELETE CASCADE,
  department_id INT NOT NULL REFERENCES tbl_department(department_id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_task_category(
  task_category_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_tasks (
  task_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  task_image TEXT,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  task_category_id INT NOT NULL REFERENCES tbl_task_category(task_category_id),
  restrict_qty BOOLEAN NOT NULL DEFAULT FALSE,
  is_guest_enable BOOLEAN NOT NULL DEFAULT FALSE,
  checklist_id INT REFERENCES tbl_checklist(checklist_id),
  completion_time DECIMAL NOT NULL,
  reminder_time DECIMAL NOT NULL,
  department_id INT NOT NULL REFERENCES tbl_department(department_id),
  sub_department_id INT NOT NULL REFERENCES tbl_sub_department(sub_department_id),
  section_id INT NOT NULL REFERENCES tbl_section(section_id),
  user_level_id INT NOT NULL REFERENCES tbl_user_level(user_level_id),
  escalate_until INT NOT NULL REFERENCES tbl_user_level(user_level_id),
  escalation_interval DECIMAL NOT NULL,
  is_chargeable BOOLEAN NOT NULL DEFAULT FALSE,
  hsn_code_id INT REFERENCES tbl_hsn_code(hsn_code_id),
  is_open_item BOOLEAN DEFAULT FALSE,
  base_price DECIMAL,
  tax_id INT REFERENCES tbl_tax(tax_id),
  service_charge_id INT REFERENCES tbl_service_charge(service_charge_id),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CHECK (
    (is_chargeable = TRUE AND hsn_code_id IS NOT NULL AND base_price IS NOT NULL AND tax_id IS NOT NULL AND service_charge_id IS NOT NULL) OR
    (is_chargeable = FALSE AND hsn_code_id IS NULL AND base_price IS NULL AND tax_id IS NULL AND service_charge_id IS NULL)
  )
);

CREATE TABLE IF NOT EXISTS tbl_how_to(
  how_to_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_how_to_room(
  how_to_room_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  how_to_id INT NOT NULL REFERENCES tbl_how_to(how_to_id) ON DELETE CASCADE,
  room_id INT NOT NULL REFERENCES tbl_rooms(room_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_incident_category(
  category_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_incident_source(
  source_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_lost_and_found_article_type(
  article_type_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  storage_days DECIMAL NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_lost_and_found_storage_location(
  storage_location_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_lost_and_found_notification(
  notification_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL UNIQUE REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  guest_found BOOLEAN NOT NULL,
  guest_found_reminders DECIMAL NOT NULL,
  guest_discard BOOLEAN NOT NULL,
  guest_discard_reminders DECIMAL NOT NULL,
  staff_found BOOLEAN NOT NULL,
  staff_discard BOOLEAN NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_default_options(
  default_options_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL UNIQUE REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  noti_sound_new INT NOT NULL REFERENCES tbl_master_alarm_sound(alarm_sound_id),
  noti_sound_reminder INT NOT NULL REFERENCES tbl_master_alarm_sound(alarm_sound_id),
  noti_sound_escalation INT NOT NULL REFERENCES tbl_master_alarm_sound(alarm_sound_id),
  language VARCHAR(255) NOT NULL
  theme VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_promotion_banner(
  promotion_banner_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  valid_till VARCHAR(255) NOT NULL,
  banner_image TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_printer(
  printer_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_printer_department(
  printer_deparment_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  printer_id INT NOT NULL REFERENCES tbl_printer(printer_id) ON DELETE CASCADE,
  department_id INT NOT NULL REFERENCES tbl_department(department_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_default_options(
  default_option_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL UNIQUE REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  snooze_action INT NOT NULL REFERENCES tbl_common_options(option_id),
  snooze_action_time DECIMAL NOT NULL,
  double_snooze_action INT NOT NULL REFERENCES tbl_common_options(option_id),
  double_snooze_action_time DECIMAL NOT NULL,
  decline_action INT NOT NULL REFERENCES tbl_common_options(option_id),
  decline_action_time DECIMAL NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_guest_profile (
  guest_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  salutation_id INTEGER NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  nationality_id INT NOT NULL REFERENCES tbl_master_nationality(nationality_id),
  dob VARCHAR(255),
  vip_level_id INT REFERENCES tbl_vip_level(vip_level_id),
  allow_credit BOOLEAN DEFAULT FALSE,
  ar_id VARCHAR(255),
  credit_limit DECIMAL DEFAULT 0,
  balance_credit_limit DECIMAL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_guest_identifications(
  guest_identification__id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  profile_id INT NOT NULL,
  identification_type_id INT NOT NULL REFERENCES tbl_identification_type(identification_type_id),
  document_no VARCHAR(255) NOT NULL,
  image TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_company_profile (
  company_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  representative INT NOT NULL REFERENCES tbl_guest_profile(guest_id),
  account_manager INT NOT NULL REFERENCES tbl_users(user_id),
  allow_credit BOOLEAN DEFAULT FALSE,
  ar_id VARCHAR(255),
  credit_limit DECIMAL DEFAULT 0,
  balance_credit_limit DECIMAL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_agent_profile (
  agent_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  representative INT NOT NULL REFERENCES tbl_guest_profile(guest_id),
  account_manager INT NOT NULL REFERENCES tbl_users(user_id),
  allow_credit BOOLEAN DEFAULT FALSE,
  ar_id VARCHAR(255),
  credit_limit DECIMAL DEFAULT 0,
  balance_credit_limit DECIMAL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_vendor_profile (
  vendor_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  representative INT NOT NULL REFERENCES tbl_guest_profile(guest_id),
  account_manager INT NOT NULL REFERENCES tbl_users(user_id),
  allow_credit BOOLEAN DEFAULT FALSE,
  ar_id VARCHAR(255),
  credit_limit DECIMAL DEFAULT 0,
  balance_credit_limit DECIMAL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_profile_mobiles(
  profile_mobile_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  profile_id INT NOT NULL,
  mobile_no VARCHAR(20) NOT NULL,
  profile_type VARCHAR(255) NOT NULL CHECK (profile_type IN ('GUEST', 'COMPANY','AGENT','VENDOR')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_profile_emails(
  profile_email_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  profile_id INT NOT NULL,
  email VARCHAR(255) NOT NULL,
  profile_type VARCHAR(255) NOT NULL CHECK (profile_type IN ('GUEST', 'COMPANY','AGENT','VENDOR')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_profile_memberships(
  profile_membership_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  profile_id INT NOT NULL,
  loyalty_program_id INT NOT NULL REFERENCES tbl_loyalty_program(loyalty_program_id),
  membership_level_id INT NOT NULL REFERENCES tbl_membership_level(membership_level_id),
  membership_no VARCHAR(255) NOT NULL,
  profile_type VARCHAR(255) NOT NULL CHECK (profile_type IN ('GUEST', 'COMPANY','AGENT','VENDOR')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_profile_documents(
  profile_document_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  profile_id INT NOT NULL,
  document_name VARCHAR(255) NOT NULL,
  document_no VARCHAR(255) NOT NULL,
  image TEXT NOT NULL,
  profile_type VARCHAR(255) NOT NULL CHECK (profile_type IN ('GUEST', 'COMPANY','AGENT','VENDOR')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_profile_address(
  profile_address_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  profile_id INT NOT NULL,
  address_type INT NOT NULL REFERENCES tbl_common_options(option_id),
  address_line_1 TEXT NOT NULL,
  address_line_2 TEXT,
  postal_code DECIMAL,
  city VARCHAR(255),
  country_id INTEGER NOT NULL REFERENCES tbl_country_list(country_id),
  profile_type VARCHAR(255) NOT NULL CHECK (profile_type IN ('GUEST', 'COMPANY','AGENT','VENDOR')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Staff to Guest chat tables
CREATE TABLE IF NOT EXISTS tbl_tickets (
  ticket_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  created_by VARCHAR(255) NOT NULL,
  ticket_type INT NOT NULL REFERENCES tbl_common_options(option_id),
  room_id INT DEFAULT NULL REFERENCES tbl_rooms(room_id),
  public_area_id INT DEFAULT NULL REFERENCES tbl_public_area(public_area_id),
  is_schedule BOOLEAN DEFAULT FALSE,
  schedule_timestamp VARCHAR(255) DEFAULT NULL,
  is_re_opened BOOLEAN DEFAULT FALSE,
  completion_time VARCHAR(255) NULL,  
  ticket_status INT NOT NULL REFERENCES tbl_master_ticket_status(status_id),
  checklist_id INT DEFAULT NULL REFERENCES tbl_checklist(checklist_id),
  task_id INT NOT NULL REFERENCES tbl_tasks(task_id),
  name VARCHAR(255) NOT NULL,
  department_id INT NOT NULL REFERENCES tbl_department(department_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_ticket_tasks(
  ticket_task_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ticket_id INT DEFAULT NULL REFERENCES tbl_tickets(ticket_id) ON DELETE CASCADE,
  task_id INT NOT NULL REFERENCES tbl_tasks(task_id),
  is_chargeable BOOLEAN DEFAULT FALSE,
  qty DECIMAL,
  note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_ticket_images(
  ticket_image_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ticket_id INT DEFAULT NULL REFERENCES tbl_tickets(ticket_id) ON DELETE CASCADE,
  image TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_ticket_checklist_actions(
  ticket_checklist_action_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ticket_id INT DEFAULT NULL REFERENCES tbl_tickets(ticket_id) ON DELETE CASCADE,
  department_id INT NOT NULL REFERENCES tbl_department(department_id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  status INT NOT NULL DEFAULT -1 CHECK (status IN (1, 0, -1)),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_ticket_inventory(
  ticket_inventory_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  ticket_id INT DEFAULT NULL REFERENCES tbl_tickets(ticket_id) ON DELETE CASCADE,
  department_id INT NOT NULL REFERENCES tbl_department(department_id),
  inventory_type_id INT NOT NULL REFERENCES tbl_inventory_type(inventory_type_id),
  inventory_item_id INT NOT NULL REFERENCES tbl_inventory_item(inventory_item_id),
  qty DECIMAL NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_ticket_agents(
  ticket_agent_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ticket_id INT DEFAULT NULL REFERENCES tbl_tickets(ticket_id) ON DELETE CASCADE,
  agent_id INT NOT NULL REFERENCES tbl_users(user_id),
  is_parent BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_queue_tickets(
  queue_ticket_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  ticket_id INT DEFAULT NULL REFERENCES tbl_tickets(ticket_id) ON DELETE CASCADE,
  department_id INT NOT NULL REFERENCES tbl_department(department_id),
  sub_department_id INT NOT NULL REFERENCES tbl_sub_department(sub_department_id),
  section_id INT NOT NULL REFERENCES tbl_section(section_id),
  user_level_id INT NOT NULL REFERENCES tbl_user_level(user_level_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_ticket_available_staff(
  ticket_available_staff_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  user_id INT NOT NULL UNIQUE REFERENCES tbl_users(user_id),
  department_id INT NOT NULL REFERENCES tbl_department(department_id),
  sub_department_id INT NOT NULL REFERENCES tbl_sub_department(sub_department_id),
  section_id INT NOT NULL REFERENCES tbl_section(section_id),
  user_level_id INT NOT NULL REFERENCES tbl_user_level(user_level_id),
  is_engagged BOOLEAN DEFAULT FALSE,  
  ticket_id INT DEFAULT NULL REFERENCES tbl_tickets(ticket_id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_staff_availablity_log(
  staff_availablity_log_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  user_id INT NOT NULL REFERENCES tbl_users(user_id),
  action VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_incidents (
  incident_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  created_by INT NOT NULL REFERENCES tbl_users(user_id),  
  guest_type_id INT NOT NULL REFERENCES tbl_common_options(option_id),
  category_id INT NOT NULL REFERENCES tbl_incident_category(category_id),
  guest_id INT NOT NULL REFERENCES tbl_guest_profile(guest_id),
  incident_date_time VARCHAR(255) NOT NULL,
  reported_date_time VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  recovery_cost DECIMAL(10, 2) DEFAULT NULL,
  status INT DEFAULT NULL REFERENCES tbl_master_incident_status(status_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_incident_departments (
  incident_department_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  incident_id INT REFERENCES tbl_incidents(incident_id) ON DELETE CASCADE,
  department_id INT REFERENCES tbl_department(department_id),
  investigation TEXT DEFAULT NULL,
  resolution TEXT DEFAULT NULL,
  source_id INT DEFAULT NULL REFERENCES tbl_incident_source(source_id),
  status INT DEFAULT NULL REFERENCES tbl_master_incident_status(status_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_incident_images (
  incident_image_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  incident_id INT REFERENCES tbl_incidents(incident_id) ON DELETE CASCADE,
  image TEXT NOT NULL,
  department_id INT REFERENCES tbl_department(department_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_lost_and_found (
  lost_and_found_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  created_by INT NOT NULL REFERENCES tbl_users(user_id),
  found_location_id INT NOT NULL REFERENCES tbl_common_options(option_id),
  found_by_id INT NOT NULL REFERENCES tbl_users(user_id),
  guest_id INT REFERENCES tbl_guest_profile(guest_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_lost_and_found_articles (
  article_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  lost_and_found_id INT NOT NULL REFERENCES tbl_lost_and_found(lost_and_found_id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT DEFAULT NULL,
  article_type_id INT NOT NULL REFERENCES tbl_lost_and_found_article_type(article_type_id),
  stored_until VARCHAR(255) NOT NULL,
  storage_location_id INT NOT NULL REFERENCES tbl_lost_and_found_storage_location(storage_location_id),
  status INT NOT NULL DEFAULT 1 REFERENCES tbl_master_lost_and_found_status(status_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_lost_and_found_images (
  lf_image_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  article_id INT NOT NULL REFERENCES tbl_lost_and_found_articles(article_id) ON DELETE CASCADE,
  image TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_task_manager(
  task_manager_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  created_by INT NOT NULL REFERENCES tbl_users(user_id),
  assigned_to_id INT NOT NULL REFERENCES tbl_users(user_id),
  resolution_type_id INT NOT NULL REFERENCES tbl_common_options(option_id),
  resolution_date VARCHAR(255),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  status INT NOT NULL REFERENCES tbl_master_task_manager_status(status_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_task_manager_departments (
  task_dep_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  task_manager_id INT NOT NULL REFERENCES tbl_task_manager(task_manager_id) ON DELETE CASCADE,
  department_id INT NOT NULL REFERENCES tbl_department(department_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_task_manager_sub_departments (
  task_sub_dep_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  task_manager_id INT NOT NULL REFERENCES tbl_task_manager(task_manager_id) ON DELETE CASCADE,
  sub_department_id INT NOT NULL REFERENCES tbl_sub_department(sub_department_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_task_manager_sections (
  task_section_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  task_manager_id INT NOT NULL REFERENCES tbl_task_manager(task_manager_id) ON DELETE CASCADE,
  section_id INT NOT NULL REFERENCES tbl_section(section_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_task_manager_images (
  task_image_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  task_manager_id INT NOT NULL REFERENCES tbl_task_manager(task_manager_id) ON DELETE CASCADE,
  image TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_audit_changes_logs (
  change_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INT NOT NULL REFERENCES tbl_users(user_id),
  target_id INT NOT NULL,
  dashboard_name VARCHAR(255) NOT NULL,
  change_label VARCHAR(255),
  field_name VARCHAR(255) NOT NULL,
  old_value TEXT DEFAULT NULL,
  new_value TEXT DEFAULT NULL,
  request_id UUID DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--  Staff-to-Staff chat tables
CREATE TABLE IF NOT EXISTS tbl_users_status (
  user_status_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INT NOT NULL UNIQUE REFERENCES tbl_users(user_id) ON DELETE CASCADE,
  is_online BOOLEAN NOT NULL DEFAULT FALSE,
  last_online_at VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_staff_chat_channel(
  channel_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  type INT NOT NULL DEFAULT 1,
  name VARCHAR(50) DEFAULT NULL,
  image_url VARCHAR(255) DEFAULT NUll,
  is_active BOOLEAN DEFAULT TRUE,
  department_id INT REFERENCES tbl_department(department_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_staff_chat_channel_members(
  member_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  channel_id INT NOT NULL,
  user_id INT NOT NULL REFERENCES tbl_users(user_id),
  is_message_allowed BOOLEAN DEFAULT TRUE,
  role VARCHAR(255) DEFAULT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_staff_chat_messages(
  message_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  channel_id INT NOT NULL,
  sender_id INT NOT NULL,
  content VARCHAR(255) NOT NULL,
  content_type VARCHAR(255) NOT NULL CHECK (content_type IN ('text', 'image','audio','video','file')),
  is_active BOOLEAN DEFAULT TRUE,
  is_edited BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_staff_chat_messages_seen(
  seen_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  channel_id INT NOT NULL,
  user_id INT NOT NULL,
  message_id INT NOT NULL,
  seen_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--Guest to Staff Chat
CREATE TABLE IF NOT EXISTS tbl_guest_staff_chat_channel(
  channel_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  room_id INT NOT NULL REFERENCES tbl_rooms(room_id),
  user_id INT REFERENCES tbl_users(user_id),
  is_active BOOLEAN DEFAULT TRUE,
  conv_start_time VARCHAR(255) NOT NULL,
  conv_end_time VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_guest_staff_chat_messages(
  message_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  channel_id INT NOT NULL REFERENCES tbl_guest_staff_chat_channel(channel_id),
  sender_id INT NOT NULL,
  is_guest_msg BOOLEAN DEFAULT FALSE,
  content VARCHAR(255) NOT NULL,
  content_type VARCHAR(255) NOT NULL CHECK (content_type IN ('text', 'image','audio','video','file')),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tbl_guest_staff_chat_message_seen(
  seen_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  channel_id INT NOT NULL REFERENCES tbl_guest_staff_chat_channel(channel_id),
  user_id INT NOT NULL,
  message_id INT NOT NULL,
  seen_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications Table

CREATE TABLE IF NOT EXISTS tbl_notifications(
  notification_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  organization_id INT NOT NULL REFERENCES tbl_organization(organization_id) ON DELETE CASCADE,
  user_id INT NOT NULL REFERENCES tbl_users(user_id),
  title TEXT,
  module VARCHAR(255),
  name TEXT,
  location TEXT,
  task TEXT,
  message TEXT,
  uid VARCHAR(255),
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);