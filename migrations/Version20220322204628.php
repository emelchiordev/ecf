<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220322204628 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP SEQUENCE instructor_id_seq CASCADE');
        $this->addSql('ALTER TABLE course ADD instructor_id INT NOT NULL');
        $this->addSql('ALTER TABLE course ADD CONSTRAINT FK_169E6FB98C4FC193 FOREIGN KEY (instructor_id) REFERENCES instructor (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_169E6FB98C4FC193 ON course (instructor_id)');
        $this->addSql('ALTER TABLE instructor ADD CONSTRAINT FK_31FC43DDBF396750 FOREIGN KEY (id) REFERENCES "user" (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE lesson ADD section_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE lesson ADD CONSTRAINT FK_F87474F3D823E37A FOREIGN KEY (section_id) REFERENCES section (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_F87474F3D823E37A ON lesson (section_id)');
        $this->addSql('ALTER TABLE section ADD course_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE section ADD CONSTRAINT FK_2D737AEF591CC992 FOREIGN KEY (course_id) REFERENCES course (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_2D737AEF591CC992 ON section (course_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('CREATE SEQUENCE instructor_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('ALTER TABLE course DROP CONSTRAINT FK_169E6FB98C4FC193');
        $this->addSql('DROP INDEX IDX_169E6FB98C4FC193');
        $this->addSql('ALTER TABLE course DROP instructor_id');
        $this->addSql('ALTER TABLE instructor DROP CONSTRAINT FK_31FC43DDBF396750');
        $this->addSql('ALTER TABLE lesson DROP CONSTRAINT FK_F87474F3D823E37A');
        $this->addSql('DROP INDEX IDX_F87474F3D823E37A');
        $this->addSql('ALTER TABLE lesson DROP section_id');
        $this->addSql('ALTER TABLE section DROP CONSTRAINT FK_2D737AEF591CC992');
        $this->addSql('DROP INDEX IDX_2D737AEF591CC992');
        $this->addSql('ALTER TABLE section DROP course_id');
    }
}
