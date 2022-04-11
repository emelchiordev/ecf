<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\InstructorRepository;
use App\Controller\CreateMediaObjectAction;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;


#[ApiResource()]
#[ORM\Entity(repositoryClass: InstructorRepository::class)]

class Instructor extends User
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[Assert\NotBlank(message: "Vous devez saisir un nom")]
    #[ORM\Column(type: 'string', length: 50)]
    private $firstName;

    #[Assert\NotBlank(message: "Vous devez saisir un prénom")]
    #[ORM\Column(type: 'string', length: 50)]
    private $lastName;

    #[Assert\NotBlank(message: "Vous devez saisir une descrption")]
    #[ORM\Column(type: 'text')]
    private $description;

    #[ORM\Column(type: 'boolean')]
    private $accountValidate;

    #[ORM\OneToMany(mappedBy: 'instructor', targetEntity: Course::class, orphanRemoval: true)]
    private $courses;

    #[ORM\ManyToOne(targetEntity: MediaObject::class)]
    #[ORM\JoinColumn(nullable: true)]
    #[ApiProperty(iri: 'http://schema.org/image')]
    public ?MediaObject $avatar = null;

    public function __construct()
    {
        $this->courses = new ArrayCollection();
    }

    /*
    public function getId(): ?int
    {
        return $this->id;
    }*/

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

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

    public function getAccountValidate(): ?bool
    {
        return $this->accountValidate;
    }

    public function setAccountValidate(bool $accountValidate): self
    {
        $this->accountValidate = $accountValidate;

        return $this;
    }

    /**
     * @return Collection<int, Course>
     */
    public function getCourses(): Collection
    {
        return $this->courses;
    }

    public function addCourse(Course $course): self
    {
        if (!$this->courses->contains($course)) {
            $this->courses[] = $course;
            $course->setInstructor($this);
        }

        return $this;
    }

    public function removeCourse(Course $course): self
    {
        if ($this->courses->removeElement($course)) {
            // set the owning side to null (unless already changed)
            if ($course->getInstructor() === $this) {
                $course->setInstructor(null);
            }
        }

        return $this;
    }

    public function getAvatar(): ?MediaObject
    {
        return $this->avatar;
    }

    public function setAvatar(?MediaObject $avatar): self
    {
        $this->avatar = $avatar;

        return $this;
    }
}
