<?php

namespace App\Repository;


use App\Entity\LessonStudents;
use Doctrine\ORM\ORMException;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @method LessonStudents|null find($id, $lockMode = null, $lockVersion = null)
 * @method LessonStudents|null findOneBy(array $criteria, array $orderBy = null)
 * @method LessonStudents[]    findAll()
 * @method LessonStudents[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class LessonStudentsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, LessonStudents::class);
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function add(LessonStudents $entity, bool $flush = true): void
    {
        $this->_em->persist($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function remove(LessonStudents $entity, bool $flush = true): void
    {
        $this->_em->remove($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    // /**
    //  * @return LessonStudents[] Returns an array of LessonStudents objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('l.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?LessonStudents
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
