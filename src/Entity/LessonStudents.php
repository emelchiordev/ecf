<?php

namespace App\Entity;

use App\Entity\Lesson;
use App\Entity\Student;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\LessonStudentsRepository;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

#[ApiResource()]
#[UniqueEntity(fields: ["lesson", "student"])]
#[ORM\Entity(repositoryClass: LessonStudentsRepository::class)]
class LessonStudents
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;


    #[Groups(["read", 'courseStudent', 'students'])]
    #[ORM\Column(type: 'boolean', nullable: true)]
    private $statusLesson;

    #[Groups(["read", 'courseStudent'])]
    #[ORM\ManyToOne(targetEntity: Student::class, inversedBy: 'lessonStudents')]
    private $student;

    #[Groups(['students'])]
    #[ORM\ManyToOne(targetEntity: Lesson::class, inversedBy: 'lessonStudents')]
    private $lesson;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStatusLesson(): ?bool
    {
        return $this->statusLesson;
    }

    public function setStatusLesson(?bool $statusLesson): self
    {
        $this->statusLesson = $statusLesson;

        return $this;
    }

    public function getStudent(): ?Student
    {
        return $this->student;
    }

    public function setStudent(?Student $student): self
    {
        $this->student = $student;

        return $this;
    }

    public function getLesson(): ?Lesson
    {
        return $this->lesson;
    }

    public function setLesson(?Lesson $lesson): self
    {
        $this->lesson = $lesson;

        return $this;
    }
}
