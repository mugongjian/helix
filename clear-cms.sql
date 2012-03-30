BEGIN;
ALTER TABLE `cms_page` DROP FOREIGN KEY `publisher_public_id_refs_id_653a773`;
ALTER TABLE `cms_page` DROP FOREIGN KEY `parent_id_refs_id_653a773`;
DROP TABLE `cms_page`;
COMMIT;
