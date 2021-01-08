// in development

import { getRandomOf, handleResponseWithQuery } from '../utils'

export const getRandomVerse = handleResponseWithQuery((request) => {
  // const { bibles, books, chapters } = request.query

  // const bookId = (function () {
  //   if (books) {
  //     return
  //   }
  //   getRandomOf(66)
  // })()

  const query = `
  SET @book_id = 66;

  SET @book_short_name = (
    SELECT short_name from gnv_books WHERE id = @bookId
  );
  
  SET @verse = (
    SELECT master.verse
    FROM gnv_verses master
    WHERE book = @book_short_name #AND verse LIKE '1.%'
    ORDER BY RAND()
    LIMIT 1
  );
  
  SELECT m.value AS version_fullname, m2.value as version_name, b.id as book_id, b.long_name, b.short_name, REGEXP_SUBSTR('aasd1222', '\.([0-1])+'), v.content
    FROM gnv_verses v, gnv_books b
      JOIN gnv_metadata m
        ON m.name = 'fullname'
      JOIN gnv_metadata m2
        ON m2.name = 'name'
    WHERE book = @book_short_name
    AND verse = @verse
    AND b.id = @book_id
  /*UNION
  SELECT *, b.long_name
    FROM amp_verses v, amp_books b
    WHERE book = @book_short_name
    AND verse = @verse
    AND b.id = @book_id
  UNION
  SELECT *, b.long_name
    FROM rvr60_verses v, rvr60_books b
    WHERE book = @book_short_name
    AND verse = @verse
    AND b.id = @book_id*/
  `

  return query
})
