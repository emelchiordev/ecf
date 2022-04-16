<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CoursesStudentsRepository;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

#[ApiResource()]
#[ORM\Entity(repositoryClass: CoursesStudentsRepository::class)]
#[UniqueEntity(fields: ["courses", "students"])]
class CoursesStudents
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['students'])]
    private $id;

    #[Groups('students')]
    #[ORM\Column(type: 'boolean', nullable: true)]
    private $statusProgress;

    #[Groups('students')]
    #[ORM\ManyToOne(targetEntity: Course::class, inversedBy: 'coursesStudents')]
    private $courses;

    #[ORM\ManyToOne(targetEntity: Student::class, inversedBy: 'coursesStudents')]
    private $students;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStatusProgress(): ?bool
    {
        return $this->statusProgress;
    }

    public function setStatusProgress(?bool $statusProgress): self
    {
        $this->statusProgress = $statusProgress;

        return $this;
    }

    public function getCourses(): ?Course
    {
        return $this->courses;
    }

    public function setCourses(?Course $courses): self
    {
        $this->courses = $courses;

        return $this;
    }

    public function getStudents(): ?Student
    {
        return $this->students;
    }

    public function setStudents(?Student $students): self
    {
        $this->students = $students;

        return $this;
    }
}
