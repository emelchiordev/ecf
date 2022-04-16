<?php

namespace App\Entity;

use App\Entity\MediaObject;
use App\Entity\CoursesObject;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\CourseRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    normalizationContext: ['groups' => ['courses_object:read']],
    itemOperations: [
        "get" => [
            'method' => "get",
            'normalization_context' => ['groups' => ['courseStudent']]
        ]
    ]
)]
#[ORM\Entity(repositoryClass: CourseRepository::class)]
class Course
{
    #[Groups(['courses_object:read', 'students', 'courseStudent'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[Groups(['courses_object:read', 'students', 'courseStudent'])]
    #[ORM\Column(type: 'string', length: 255)]
    private $title;

    #[Groups(['courses_object:read', 'courseStudent', 'students'])]
    #[ORM\ManyToOne(targetEntity: CoursesObject::class)]
    #[ORM\JoinColumn(nullable: true)]
    #[ApiProperty(iri: 'http://schema.org/image')]
    public ?CoursesObject $photos = null;

    #[Groups(['courses_object:read', 'courseStudent', 'students'])]
    #[ORM\Column(type: 'text')]
    private $description;

    #[Groups(['courses_object:read', 'courseStudent'])]
    #[ORM\ManyToOne(targetEntity: Instructor::class, inversedBy: 'courses')]
    #[ORM\JoinColumn(nullable: false)]
    private $instructor;

    #[Groups(['courses_object:read', 'courseStudent'])]
    #[ORM\OneToMany(mappedBy: 'course', targetEntity: Section::class)]
    private $section;



    #[ORM\Column(type: 'datetime', nullable: true)]
    private $dateCreated;


    #[ORM\ManyToMany(targetEntity: Student::class, mappedBy: 'coursesFollow')]
    private $students;


    #[ORM\OneToMany(mappedBy: 'courses', targetEntity: CoursesStudents::class)]
    private $coursesStudents;

    public function __construct()
    {
        $this->section = new ArrayCollection();
        $this->students = new ArrayCollection();
        $this->coursesStudents = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getInstructor(): ?Instructor
    {
        return $this->instructor;
    }

    public function setInstructor(?Instructor $instructor): self
    {
        $this->instructor = $instructor;

        return $this;
    }

    /**
     * @return Collection<int, Section>
     */
    public function getSection(): Collection
    {
        return $this->section;
    }

    public function addSection(Section $section): self
    {
        if (!$this->section->contains($section)) {
            $this->section[] = $section;
            $section->setCourse($this);
        }

        return $this;
    }

    public function removeSection(Section $section): self
    {
        if ($this->section->removeElement($section)) {
            // set the owning side to null (unless already changed)
            if ($section->getCourse() === $this) {
                $section->setCourse(null);
            }
        }

        return $this;
    }


    public function getPhoto(): ?CoursesObject
    {
        return $this->photos;
    }

    public function setAvatar(?CoursesObject $photos): self
    {
        $this->photos = $photos;

        return $this;
    }

    public function getDateCreated(): ?\DateTimeInterface
    {
        return $this->dateCreated;
    }

    public function setDateCreated(?\DateTimeInterface $dateCreated): self
    {
        $this->dateCreated = $dateCreated;

        return $this;
    }

    /**
     * @return Collection<int, Student>
     */
    public function getStudents(): Collection
    {
        return $this->students;
    }

    public function addStudent(Student $student): self
    {
        if (!$this->students->contains($student)) {
            $this->students[] = $student;
            $student->addCoursesFollow($this);
        }

        return $this;
    }

    public function removeStudent(Student $student): self
    {
        if ($this->students->removeElement($student)) {
            $student->removeCoursesFollow($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, CoursesStudents>
     */
    public function getCoursesStudents(): Collection
    {
        return $this->coursesStudents;
    }

    public function addCoursesStudent(CoursesStudents $coursesStudent): self
    {
        if (!$this->coursesStudents->contains($coursesStudent)) {
            $this->coursesStudents[] = $coursesStudent;
            $coursesStudent->setCourses($this);
        }

        return $this;
    }

    public function removeCoursesStudent(CoursesStudents $coursesStudent): self
    {
        if ($this->coursesStudents->removeElement($coursesStudent)) {
            // set the owning side to null (unless already changed)
            if ($coursesStudent->getCourses() === $this) {
                $coursesStudent->setCourses(null);
            }
        }

        return $this;
    }
}
