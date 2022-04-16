<?php

namespace App\Entity;


use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\CreateCourseObjectAction;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * @Vich\Uploadable
 */
#[ORM\Entity]
#[ApiResource(
    iri: 'http://schema.org/MediaObject',
    normalizationContext: ['groups' => ['courses_object:read']],
    itemOperations: ['get'],
    collectionOperations: [
        'get',
        'post' => [
            'controller' => CreateCourseObjectAction::class,
            'deserialize' => false,
            'validation_groups' => ['Default', 'courses_object_create'],
            'openapi_context' => [
                'requestBody' => [
                    'content' => [
                        'multipart/form-data' => [
                            'schema' => [
                                'type' => 'object',
                                'properties' => [
                                    'file' => [
                                        'type' => 'string',
                                        'format' => 'binary',
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ],
    ]
)]
class CoursesObject
{

    #[Groups(['courses_object:read'])]
    #[ORM\Id, ORM\Column, ORM\GeneratedValue]
    private ?int $id = null;


    #[ApiProperty(iri: 'http://schema.org/contentUrl')]
    #[Groups(['courses_object:read', 'courseStudent', 'students'])]
    public ?string $contentUrl = null;

    /**
     * @Vich\UploadableField(mapping="courses_object", fileNameProperty="filePath")
     */
    #[Assert\NotNull(groups: ['courses_object_create'])]
    public ?File $file = null;

    #[ORM\Column(nullable: true)]
    public ?string $filePath = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFilePath(): ?string
    {
        return $this->filePath;
    }
}
