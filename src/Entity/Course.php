<?php

namespace App\Entity;

use App\Entity\MediaObject;
use App\Entity\CoursesObject;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\CourseRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource()]
#[ORM\Entity(repositoryClass: CourseRepository::class)]
class Course
{
    #[Groups(["getCourses"])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[Groups(["getCourses"])]
    #[ORM\Column(type: 'string', length: 255)]
    private $title;

    #[Groups(["getCourses"])]
    #[ORM\ManyToOne(targetEntity: CoursesObject::class)]
    #[ORM\JoinColumn(nullable: true)]
    #[ApiProperty(iri: 'http://schema.org/image')]
    public ?CoursesObject $photos = null;

    #[Groups(["getCourses"])]
    #[ORM\Column(type: 'text')]
    private $description;

    #[Groups(["getCourses"])]
    #[ORM\ManyToOne(targetEntity: Instructor::class, inversedBy: 'courses')]
    #[ORM\JoinColumn(nullable: false)]
    private $instructor;

    #[Groups(["getCourses"])]
    #[ORM\OneToMany(mappedBy: 'course', targetEntity: Section::class)]
    private $section;

    public function __construct()
    {
        $this->section = new ArrayCollection();
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
}
