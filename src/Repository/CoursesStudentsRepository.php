<?php

namespace App\Repository;

use App\Entity\CoursesStudents;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method CoursesStudents|null find($id, $lockMode = null, $lockVersion = null)
 * @method CoursesStudents|null findOneBy(array $criteria, array $orderBy = null)
 * @method CoursesStudents[]    findAll()
 * @method CoursesStudents[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CoursesStudentsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CoursesStudents::class);
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function add(CoursesStudents $entity, bool $flush = true): void
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
    public function remove(CoursesStudents $entity, bool $flush = true): void
    {
        $this->_em->remove($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    // /**
    //  * @return CoursesStudents[] Returns an array of CoursesStudents objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?CoursesStudents
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
