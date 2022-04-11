<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220411212705 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE course DROP CONSTRAINT FK_169E6FB9301EC62');
        $this->addSql('ALTER TABLE course ADD CONSTRAINT FK_169E6FB9301EC62 FOREIGN KEY (photos_id) REFERENCES courses_object (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE course DROP CONSTRAINT fk_169e6fb9301ec62');
        $this->addSql('ALTER TABLE course ADD CONSTRAINT fk_169e6fb9301ec62 FOREIGN KEY (photos_id) REFERENCES media_object (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }
}
