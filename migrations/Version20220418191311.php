<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220418191311 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE course_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE courses_object_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE courses_students_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE lesson_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE lesson_students_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE media_object_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE section_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE "user_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE administrator (id INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE course (id INT NOT NULL, photos_id INT DEFAULT NULL, instructor_id INT NOT NULL, title VARCHAR(255) NOT NULL, description TEXT NOT NULL, date_created TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, published BOOLEAN DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_169E6FB9301EC62 ON course (photos_id)');
        $this->addSql('CREATE INDEX IDX_169E6FB98C4FC193 ON course (instructor_id)');
        $this->addSql('CREATE TABLE courses_object (id INT NOT NULL, file_path VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE courses_students (id INT NOT NULL, courses_id INT DEFAULT NULL, students_id INT DEFAULT NULL, status_progress BOOLEAN DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_5D696B20F9295384 ON courses_students (courses_id)');
        $this->addSql('CREATE INDEX IDX_5D696B201AD8D010 ON courses_students (students_id)');
        $this->addSql('CREATE TABLE instructor (id INT NOT NULL, avatar_id INT DEFAULT NULL, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, description TEXT NOT NULL, account_validate BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_31FC43DD86383B10 ON instructor (avatar_id)');
        $this->addSql('CREATE TABLE lesson (id INT NOT NULL, section_id INT DEFAULT NULL, video TEXT NOT NULL, description TEXT NOT NULL, title VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_F87474F3D823E37A ON lesson (section_id)');
        $this->addSql('CREATE TABLE lesson_students (id INT NOT NULL, student_id INT DEFAULT NULL, lesson_id INT DEFAULT NULL, status_lesson BOOLEAN DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_EC2EC7ABCB944F1A ON lesson_students (student_id)');
        $this->addSql('CREATE INDEX IDX_EC2EC7ABCDF80196 ON lesson_students (lesson_id)');
        $this->addSql('CREATE TABLE media_object (id INT NOT NULL, file_path VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE section (id INT NOT NULL, course_id INT DEFAULT NULL, title VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_2D737AEF591CC992 ON section (course_id)');
        $this->addSql('CREATE TABLE student (id INT NOT NULL, pseudonym VARCHAR(70) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE student_course (student_id INT NOT NULL, course_id INT NOT NULL, PRIMARY KEY(student_id, course_id))');
        $this->addSql('CREATE INDEX IDX_98A8B739CB944F1A ON student_course (student_id)');
        $this->addSql('CREATE INDEX IDX_98A8B739591CC992 ON student_course (course_id)');
        $this->addSql('CREATE TABLE "user" (id INT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, discr VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON "user" (email)');
        $this->addSql('ALTER TABLE administrator ADD CONSTRAINT FK_58DF0651BF396750 FOREIGN KEY (id) REFERENCES "user" (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE course ADD CONSTRAINT FK_169E6FB9301EC62 FOREIGN KEY (photos_id) REFERENCES courses_object (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE course ADD CONSTRAINT FK_169E6FB98C4FC193 FOREIGN KEY (instructor_id) REFERENCES instructor (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE courses_students ADD CONSTRAINT FK_5D696B20F9295384 FOREIGN KEY (courses_id) REFERENCES course (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE courses_students ADD CONSTRAINT FK_5D696B201AD8D010 FOREIGN KEY (students_id) REFERENCES student (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE instructor ADD CONSTRAINT FK_31FC43DD86383B10 FOREIGN KEY (avatar_id) REFERENCES media_object (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE instructor ADD CONSTRAINT FK_31FC43DDBF396750 FOREIGN KEY (id) REFERENCES "user" (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE lesson ADD CONSTRAINT FK_F87474F3D823E37A FOREIGN KEY (section_id) REFERENCES section (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE lesson_students ADD CONSTRAINT FK_EC2EC7ABCB944F1A FOREIGN KEY (student_id) REFERENCES student (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE lesson_students ADD CONSTRAINT FK_EC2EC7ABCDF80196 FOREIGN KEY (lesson_id) REFERENCES lesson (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE section ADD CONSTRAINT FK_2D737AEF591CC992 FOREIGN KEY (course_id) REFERENCES course (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE student ADD CONSTRAINT FK_B723AF33BF396750 FOREIGN KEY (id) REFERENCES "user" (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE student_course ADD CONSTRAINT FK_98A8B739CB944F1A FOREIGN KEY (student_id) REFERENCES student (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE student_course ADD CONSTRAINT FK_98A8B739591CC992 FOREIGN KEY (course_id) REFERENCES course (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE courses_students DROP CONSTRAINT FK_5D696B20F9295384');
        $this->addSql('ALTER TABLE section DROP CONSTRAINT FK_2D737AEF591CC992');
        $this->addSql('ALTER TABLE student_course DROP CONSTRAINT FK_98A8B739591CC992');
        $this->addSql('ALTER TABLE course DROP CONSTRAINT FK_169E6FB9301EC62');
        $this->addSql('ALTER TABLE course DROP CONSTRAINT FK_169E6FB98C4FC193');
        $this->addSql('ALTER TABLE lesson_students DROP CONSTRAINT FK_EC2EC7ABCDF80196');
        $this->addSql('ALTER TABLE instructor DROP CONSTRAINT FK_31FC43DD86383B10');
        $this->addSql('ALTER TABLE lesson DROP CONSTRAINT FK_F87474F3D823E37A');
        $this->addSql('ALTER TABLE courses_students DROP CONSTRAINT FK_5D696B201AD8D010');
        $this->addSql('ALTER TABLE lesson_students DROP CONSTRAINT FK_EC2EC7ABCB944F1A');
        $this->addSql('ALTER TABLE student_course DROP CONSTRAINT FK_98A8B739CB944F1A');
        $this->addSql('ALTER TABLE administrator DROP CONSTRAINT FK_58DF0651BF396750');
        $this->addSql('ALTER TABLE instructor DROP CONSTRAINT FK_31FC43DDBF396750');
        $this->addSql('ALTER TABLE student DROP CONSTRAINT FK_B723AF33BF396750');
        $this->addSql('DROP SEQUENCE course_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE courses_object_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE courses_students_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE lesson_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE lesson_students_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE media_object_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE section_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE "user_id_seq" CASCADE');
        $this->addSql('DROP TABLE administrator');
        $this->addSql('DROP TABLE course');
        $this->addSql('DROP TABLE courses_object');
        $this->addSql('DROP TABLE courses_students');
        $this->addSql('DROP TABLE instructor');
        $this->addSql('DROP TABLE lesson');
        $this->addSql('DROP TABLE lesson_students');
        $this->addSql('DROP TABLE media_object');
        $this->addSql('DROP TABLE section');
        $this->addSql('DROP TABLE student');
        $this->addSql('DROP TABLE student_course');
        $this->addSql('DROP TABLE "user"');
    }
}
