<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\SectionRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Validator\Constraints as Assert;


#[ApiResource(
    normalizationContext: ["groups" => ['read']]
)]
#[ORM\Entity(repositoryClass: SectionRepository::class)]
#[ApiFilter(SearchFilter::class, properties: ['course.id' => 'exact'])]
class Section
{

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["read", 'courseStudent'])]
    private $id;


    #[Assert\NotBlank(message: "Vous devez saisir un titre pour votre section")]
    #[Groups(["read", 'courseStudent'])]
    #[ORM\Column(type: 'string', length: 255)]
    private $title;

    #[Groups(["read"])]
    #[ORM\ManyToOne(targetEntity: Course::class, inversedBy: 'section')]
    private $course;

    #[Groups(["read", 'courseStudent'])]
    #[ORM\OneToMany(mappedBy: 'section', targetEntity: Lesson::class, cascade: ["remove"])]
    private $lessons;

    public function __construct()
    {
        $this->lessons = new ArrayCollection();
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

    public function getCourse(): ?Course
    {
        return $this->course;
    }

    public function setCourse(?Course $course): self
    {
        $this->course = $course;

        return $this;
    }

    /**
     * @return Collection<int, Lesson>
     */
    public function getLessons(): Collection
    {
        return $this->lessons;
    }

    public function addLesson(Lesson $lesson): self
    {
        if (!$this->lessons->contains($lesson)) {
            $this->lessons[] = $lesson;
            $lesson->setSection($this);
        }

        return $this;
    }

    public function removeLesson(Lesson $lesson): self
    {
        if ($this->lessons->removeElement($lesson)) {
            // set the owning side to null (unless already changed)
            if ($lesson->getSection() === $this) {
                $lesson->setSection(null);
            }
        }

        return $this;
    }
}
