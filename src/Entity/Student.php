<?php

namespace App\Entity;

use App\Entity\LessonStudents;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\StudentRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    attributes: ["security" => "is_granted('IS_AUTHENTICATED_FULLY')"],
    collectionOperations: [
        "post" => ['method' => 'post']
    ],
    itemOperations: [
        "get" => [
            'method' => "get",
            'normalization_context' => ['groups' => ['students']]
        ]
    ]
)]
#[ORM\Entity(repositoryClass: StudentRepository::class)]
class Student extends User
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[Groups('students')]
    #[Assert\NotBlank(message: "Vous devez saisir un pseudonyme")]
    #[ORM\Column(type: 'string', length: 70)]
    private $pseudonym;

    #[Groups('students')]
    #[ORM\ManyToMany(targetEntity: Course::class, inversedBy: 'students')]
    private $coursesFollow;

    #[Groups('students')]
    #[ORM\OneToMany(mappedBy: 'students', targetEntity: CoursesStudents::class)]
    private $coursesStudents;

    #[Groups('students')]
    #[ORM\OneToMany(mappedBy: 'student', targetEntity: LessonStudents::class)]
    private $lessonStudents;

    public function __construct()
    {
        $this->coursesFollow = new ArrayCollection();
        $this->coursesStudents = new ArrayCollection();
        $this->lessonStudents = new ArrayCollection();
    }

    /*
    public function getId(): ?int
    {
        return $this->id;
    }*/

    public function getPseudonym(): ?string
    {
        return $this->pseudonym;
    }

    public function setPseudonym(string $pseudonym): self
    {
        $this->pseudonym = $pseudonym;

        return $this;
    }

    /**
     * @return Collection<int, Course>
     */
    public function getCoursesFollow(): Collection
    {
        return $this->coursesFollow;
    }

    public function addCoursesFollow(Course $coursesFollow): self
    {
        if (!$this->coursesFollow->contains($coursesFollow)) {
            $this->coursesFollow[] = $coursesFollow;
        }

        return $this;
    }

    public function removeCoursesFollow(Course $coursesFollow): self
    {
        $this->coursesFollow->removeElement($coursesFollow);

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
            $coursesStudent->setStudents($this);
        }

        return $this;
    }

    public function removeCoursesStudent(CoursesStudents $coursesStudent): self
    {
        if ($this->coursesStudents->removeElement($coursesStudent)) {
            // set the owning side to null (unless already changed)
            if ($coursesStudent->getStudents() === $this) {
                $coursesStudent->setStudents(null);
            }
        }

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
            $lessonStudent->setStudent($this);
        }

        return $this;
    }

    public function removeLessonStudent(LessonStudents $lessonStudent): self
    {
        if ($this->lessonStudents->removeElement($lessonStudent)) {
            // set the owning side to null (unless already changed)
            if ($lessonStudent->getStudent() === $this) {
                $lessonStudent->setStudent(null);
            }
        }

        return $this;
    }
}
