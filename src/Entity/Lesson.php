<?php

namespace App\Entity;

use App\Entity\LessonStudents;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\LessonRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource()]
#[ORM\Entity(repositoryClass: LessonRepository::class)]
class Lesson
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["read", 'courseStudent', 'students'])]
    private $id;

    #[ORM\Column(type: 'text')]
    #[Groups(["read", 'courseStudent'])]
    private $video;

    #[ORM\Column(type: 'text')]
    #[Groups(["read", 'courseStudent'])]
    private $description;

    #[ORM\ManyToOne(targetEntity: Section::class, inversedBy: 'lessons')]
    private $section;

    #[Groups(["read", 'courseStudent'])]
    #[ORM\Column(type: 'string', length: 255)]
    private $title;

    #[Groups(["read", 'courseStudent'])]
    #[ORM\OneToMany(mappedBy: 'lesson', targetEntity: LessonStudents::class)]
    private $lessonStudents;

    public function __construct()
    {
        $this->lessonStudents = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getVideo(): ?string
    {
        return $this->video;
    }

    public function setVideo(string $video): self
    {
        $this->video = $video;

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

    public function getSection(): ?Section
    {
        return $this->section;
    }

    public function setSection(?Section $section): self
    {
        $this->section = $section;

        return $this;
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

    /**
     * @return Collection<int, LessonStudents>
     */
    public function getLessonStudents(): Collection
    {
        return $this->lessonStudents;
    }

    public function addLessonStudent(LessonStudents $lessonStudent): self
    {
        if (!$this->lessonStudents->contains($lessonStudent)) {
            $this->lessonStudents[] = $lessonStudent;
            $lessonStudent->setLesson($this);
        }

        return $this;
    }

    public function removeLessonStudent(LessonStudents $lessonStudent): self
    {
        if ($this->lessonStudents->removeElement($lessonStudent)) {
            // set the owning side to null (unless already changed)
            if ($lessonStudent->getLesson() === $this) {
                $lessonStudent->setLesson(null);
            }
        }

        return $this;
    }
}
