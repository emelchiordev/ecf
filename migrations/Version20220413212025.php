<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220413212025 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP SEQUENCE lesson_sudents_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE lesson_students_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE lesson_students (id INT NOT NULL, student_id INT DEFAULT NULL, lesson_id INT DEFAULT NULL, status_lesson BOOLEAN DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_EC2EC7ABCB944F1A ON lesson_students (student_id)');
        $this->addSql('CREATE INDEX IDX_EC2EC7ABCDF80196 ON lesson_students (lesson_id)');
        $this->addSql('ALTER TABLE lesson_students ADD CONSTRAINT FK_EC2EC7ABCB944F1A FOREIGN KEY (student_id) REFERENCES student (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE lesson_students ADD CONSTRAINT FK_EC2EC7ABCDF80196 FOREIGN KEY (lesson_id) REFERENCES lesson (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('DROP TABLE lesson_sudents');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE lesson_students_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE lesson_sudents_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE lesson_sudents (id INT NOT NULL, student_id INT DEFAULT NULL, lesson_id INT DEFAULT NULL, status_lesson BOOLEAN DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX idx_4e2377ffcdf80196 ON lesson_sudents (lesson_id)');
        $this->addSql('CREATE INDEX idx_4e2377ffcb944f1a ON lesson_sudents (student_id)');
        $this->addSql('ALTER TABLE lesson_sudents ADD CONSTRAINT fk_4e2377ffcb944f1a FOREIGN KEY (student_id) REFERENCES student (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE lesson_sudents ADD CONSTRAINT fk_4e2377ffcdf80196 FOREIGN KEY (lesson_id) REFERENCES lesson (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('DROP TABLE lesson_students');
    }
}
